var express = require('express');
var adminRouter = express.Router();

var theBooks = require('../controllers/hardcodedBooks');

var router = function (mongoConnect) {
   adminRouter.route('/addBooks')
      .get(function (req, res) {
         mongoConnect(function (db) {
            var collection = db.collection('books');
            collection.insertMany(theBooks, function (err, results) {
               if (err) {
                  console.log(err);
                  return;
               }
               res.send(results);
               db.close();
            });
         });
      });

   adminRouter.route('/dropBooks')
      .get(function (req, res) {
         mongoConnect(function (db) {
            var collection = db.collection('books');
            collection.drop(function (err /*, reply*/ ) {
               if (err) {
                  console.log(err);
                  return;
               }
               res.send("We deleted the collection");
               db.close();
            });
         });
      });

   return adminRouter;
};

module.exports = router;
