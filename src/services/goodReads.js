var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});
var auth = require('../../credentials');

var goodreadsService = () => {
    var getBookById = function(id, callback) {
    var options = {
            host: 'www.goodreads.com',
            path: '/book/title.xml?author=Arthur+Conan+Doyle&key=' + auth.goodreads.key + '&title=Hound+of+the+Baskervilles'
    };

    var httpCallback = (res) => {
        var str = '';

        res.on('data', function(chunk) {
            str += chunk;
        });

        res.on('end', function() {
            parser.parseString(str, function(err, result) {
                console.log(result);
                callback(null, result.GoodreadsResponse.book);
            });
        });
    };

    http.request(options, httpCallback).end();

};

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;
