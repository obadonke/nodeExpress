'use strict';

var express = require('express');

var bookRouter = express.Router();
var ObjectId = require('mongodb').ObjectID;

var emptyBook = {
    title: 'Book of non-existence',
    genre: 'Ultimate Fiction',
    author: 'Book Unfound',
    haveRead: false
};

var routerFactory = function(navItems, mongoConnect) {

    bookRouter.use(function(req, res, next) {
        if (!req.user) {
            return res.redirect('/');
        }
        return next();
    });

    bookRouter.route('/')
        .get(function(req, res) {
            mongoConnect(function(db) {
                var collection = db.collection('books');
                collection.find({}).toArray(
                    function(err, results) {
                        res.render('books', {
                            title: 'Fledgling books',
                            nav: navItems,
                            books: results
                        });
                        db.close();
                    });
            });
        });

    bookRouter.route('/:id')
        .all(function(req, res, next) {
            if (!ObjectId.isValid(req.params.id)) {
                req.book = emptyBook;
                return next();
            }

            var id = new ObjectId(req.params.id);

            mongoConnect(function(db) {
                var collection = db.collection('books');
                collection.findOne({
                    _id: id
                }, function(err, result) {
                    if (err) {
                        req.book = emptyBook;
                    } else {
                        req.book = result;
                    }
                    return next();
                });
            });
        })
        .get(function(req, res) {
            res.render('book', {
                title: 'Fledgling books',
                nav: navItems,
                book: req.book
            });

        });

    return bookRouter;
};


module.exports = routerFactory;
