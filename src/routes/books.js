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
    .get(function (req, res) {

        var renderCallback = function (err, recordset) {
            if (err) {
                console.log(err);
                return;
            }

            if (recordset.length == 0) {
                recordset = [emptyBook];
            }

            res.render('book', {
                title: 'Fledgling books',
                nav: navItems,
                book: recordset[0]
            });
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
            }, renderCallback);
        });
    });

return bookRouter;
};


module.exports = routerFactory;
