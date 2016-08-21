"use strict";

var express = require('express');

var app = express();
var sql = require('mssql');
var auth = require('./credentials');

var sqlconfig = {
    user: auth.user,
    password: auth.password,
    server: 'nodetest.database.windows.net', // You can use 'localhost\\instance' to connect to named instance 
    database: 'NodeExpress',
 
    options: {
        encrypt: true
    }
};

sql.connect(sqlconfig, function(err) {
    if (err) {
        console.log(err);
    }
});

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
