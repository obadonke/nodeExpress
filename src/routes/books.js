'use strict';

var express = require('express');

var bookRouter = express.Router();

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Stranger in a Strange Land',
        genre: 'Science Fiction',
        author: 'Robert A Heinlein',
        read: true
    },
    {
        title: 'The Gene: An Intimate History',
        genre: 'Medical History',
        author: 'Siddhartha Mukherjee',
        read: true
    },
    {
        title: 'Les Misérables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
    },
    {
        title: 'A Journey into the Center of the Earth',
        genre: 'Science Fiction',
        author: 'Jules Verne',
        read: false
    },
    {
        title: 'The Dark World',
        genre: 'Fantasy',
        author: 'Henry Kuttner',
        read: false
    },
    {
        title: 'The Wind in the Willows',
        genre: 'Fantasy',
        author: 'Kenneth Grahame',
        read: false
    },
    {
        title: 'Life On The Mississippi',
        genre: 'History',
        author: 'Mark Twain',
        read: false
    },
    {
        title: 'Childhood',
        genre: 'Biography',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Mr. Mecedes',
        genre: 'Thriller',
        author: 'Stephen King',
        read: true
    }];

var routerFactory = function (navItems) {
    bookRouter.route('/')
        .get(function (req, res) {
            res.render('books', {
                title: 'Fledgling books',
                nav: navItems,
                books: books
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            if (id >= 0 && id < books.length) {
                res.render('book', {
                    title: 'Fledgling books',
                    nav: navItems,
                    book: books[id]
                });
            } else {
                res.send("Book not found.");
            }
        });

    return bookRouter;
};


module.exports = routerFactory;
