'use strict';

var express = require('express');
var authRouter = express.Router();
//var ObjectId = require('mongodb').ObjectID;

var routerFactory = function() {

    authRouter.route('/signup')
        .post(function(req, res) {
            console.log(req.body);
            req.login(req.body, () => {
                res.redirect('profile');
            });
        });

    authRouter.route('/profile')
        .get(function(req, res) {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = routerFactory;
