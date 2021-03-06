var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});
var auth = require('../../credentials');

//TODO: Goodreads requires attribution for any data pulled from its API

var goodreadsService = () => {
    var getBookByIsbn = function(id, callback) {
    var options = {
            host: 'www.goodreads.com',
            path: '/book/isbn/' + id + '?key=' + auth.goodreads.key
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
        getBookByIsbn: getBookByIsbn
    };
};

module.exports = goodreadsService;
