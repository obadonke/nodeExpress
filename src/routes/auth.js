'use strict';

var express = require('express');
var authRouter = express.Router();
//var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');

var routerFactory = function(mongoConnect) {

    authRouter.route('/signup')
        .post(function(req, res) {
            console.log(req.body);
            mongoConnect(function(db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                collection.insert(user, function(err, results) {
                    db.close();
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });

    authRouter.route('/signin')
        .post(passport.authenticate('local', {
            failureRedirect: '/',
            successRedirect: '/auth/profile'
        }));

    authRouter.route('/profile')
        .all(function(req, res, next) {
            if (!req.user) {
                return res.redirect('/');
            }
            next();
        })
        .get(function(req, res) {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = routerFactory;
