"use strict";

var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

var navItems = [
    {
        link: '/books',
        text: 'Bookz'
    }, {
        link: '/authors',
        text: 'Authorz'
    }];


var bookRouter = require('./src/routes/books')(navItems);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.listen(port, function () {
    console.log(`running server on port ${port}`);
});

app.use('/books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Fledgling books',
        nav: navItems
    });
});
