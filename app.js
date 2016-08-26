"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session =  require('express-session');

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

var mongodb = require('mongodb').MongoClient;
var mongoConnect = function (callback) {
   var url = 'mongodb://localhost:27017/nodeExpressLibraryApp';

   mongodb.connect(url, function (err, db) {
      if (err) {
         console.log(err);
         return;
      }

      callback(db);
   });
};

var bookRouter = require('./src/routes/books')(navItems, mongoConnect);
var adminRouter = require('./src/routes/admin')(mongoConnect);
var authRouter = require('./src/routes/auth')(mongoConnect);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret:"nodeExpress"}));
require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.listen(port, function () {
   console.log(`running server on port ${port}`);
});

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function (req, res) {
   res.render('index', {
      title: 'Fledgling books',
      nav: navItems
   });
});
