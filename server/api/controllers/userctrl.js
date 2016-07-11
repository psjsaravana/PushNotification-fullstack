var passport = require('passport');
var mongoose = require('mongoose');
var gcm = require('node-gcm');
var User = mongoose.model('User');
var TokenModel = mongoose.model('Tokens');
var sessionAuth = require('./sessionauthentication');

var message = new gcm.Message();
var sender = new gcm.Sender('Your own API key');


module.exports.addtoken = function(req, res) {

    var authToken = req.query.token || req.headers['x-access-token'] || '';

    sessionAuth.validateToken(authToken, function(response) {
        if (response.success == true) {
            var deviceTokenObj = {
                token: req.body.token,
                user: response.res._doc.name
            }
            var tokenObj = new TokenModel(deviceTokenObj);

            TokenModel.find(deviceTokenObj).exec(function(err, result) {
                if (!err) {
                    if (result.length != 0) {
                        res.send({ "success": "false", "message": "Token already added" });
                    } else {
                        tokenObj.save(function(err) {
                            if (err) res.send(err);
                            res.send({ "success": "true", "message": "Token added successfully!" });
                        })
                    }
                } else {
                    res.send({ "success": "false", "message": "Database error" });
                };
            });
        } else {
            res.send({ "success": "false", "message": "Token Expired", err: response.err });
        }
    })
};

module.exports.sendnotification = function(req, res) {

    var authToken = req.query.token || req.headers['x-access-token'] || '';

    sessionAuth.validateToken(authToken, function(response) {
        if (response.success == true) {
            var userAssociatedDevices = {
                user: response.res._doc.name
            }
            TokenModel.find(userAssociatedDevices).exec(function(err, result) {
                if (!err) {
                    message.addData('title', req.body.title);
                    message.addData('body', req.body.content);                    
                    var registrationTokens = [];
                    for (var i = 0; i < result.length; i++) {
                        registrationTokens.push(result[i].token);
                    }
                    sender.send(message, { registrationTokens: registrationTokens }, function(err, response) {
                        if (err) {
                            res.send({ "success": "false", "message": "error", err: err });
                        } else {
                            res.send({ "success": "true", "message": "Notification Send", res: response });
                        }
                    });
                } else {
                    res.send({ "success": "false", "No device found": "error", err: err });
                };
            });
        } else {
            res.send({ "success": "false", "message": "Token Expired", err: response.err });
        }
    })

};
