'use strict';

var express = require('express');

var bookRouter = express.Router();

var emptyBook = {
   title: 'Book of non-existence',
   genre: 'Ultimate Fiction',
   author: 'Book Unfound',
   haveRead: false
};

var theBooks = require('./hardcodedBooks');

var routerFactory = function (navItems) {

   bookRouter.route('/')
      .get(function (req, res) {
         res.render('books', {
            title: 'Fledgling books',
            nav: navItems,
            books: theBooks
         });
      });

   bookRouter.route('/:id')
      .all(function (req, res, next) {
         var id = req.params.id;

         if (id < 1 || id > theBooks.length) {
            req.book = emptyBook;
         } else {
            req.book = theBooks[id - 1];
         }
         next();
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
