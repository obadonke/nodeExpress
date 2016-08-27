'use strict';

var express = require('express');
var bookRouter = express.Router();

var routerFactory = function(navItems, mongoConnect) {
    var bookService = require('../services/goodReads')();
    var bookController = require('../controllers/books')(bookService, navItems, mongoConnect);

    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .all(bookController.middlewareById)
        .get(bookController.getById);

    return bookRouter;
};


module.exports = routerFactory;
