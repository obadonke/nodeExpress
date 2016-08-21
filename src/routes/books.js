'use strict';

var express = require('express');

var bookRouter = express.Router();
var sql = require('mssql');

var emptyBook = {
    title: 'Book of non-existence',
    genre: 'Ultimate Fiction',
    author: 'Book Unfound',
    haveRead: false
};

var routerFactory = function (navItems) {

    bookRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();

            request.query('select * from books', function (err, recordset) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.render('books', {
                    title: 'Fledgling books',
                    nav: navItems,
                    books: recordset
                });
            });

        });


    bookRouter.route('/:id')
        .all(function (req, res, next) {
            var bookRenderCallback = function (err, recordset) {
                if (err) {
                    console.log(err);
                    return;
                }

                if (recordset.length == 0) {
                    recordset = [emptyBook];
                }

                req.book = recordset[0];
                next();
            };

            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from books where id=@id', function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                ps.execute({
                    id: req.params.id
                }, bookRenderCallback);
            });
        })
        .get(function (req, res) {
            res.render('book', {
                title: 'Fledgling books',
                nav: navItems,
                book: req.book
            });

        });

    return bookRouter;
};


module.exports = routerFactory;
