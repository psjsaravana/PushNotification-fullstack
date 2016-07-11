var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var User = mongoose.model('User');
var TokenModel = mongoose.model('Tokens');

module.exports.register = function(req, res) {

    var user = new User();

    user.name = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
        res.status(200);
        if (err) {
            res.send(err);
        } else {
            res.send({ "message": "user registered successfully!" });
        }
    });
};

module.exports.login = function(req, res) {
    var loginUser = {
        name: req.body.username
    };
    if(req.body.username) {
        User.findOne(loginUser).exec(function(err, result) {
            if (!err) {
                if (!result) {
                    res.send({ "success": "false", "message": "User not found" });
                } else if (result.password === req.body.password) {
                    var token = jwt.sign(result,'Saravana',{expiresIn: '5m'});
                    var userDetails = {username:result.name,email:result.email}
                    res.send({ "success": "true", "message": "success", token: token,userDetails:userDetails });
                } else {
                    res.send({ "success": "false", "message": "Password incorrect" });
                }
            } else {
                res.send(err);
            }
        });
    }else {
        res.send({ "success": "false", "message": "username is not valid" });
    }

};



    




