var jwt = require('jsonwebtoken');

module.exports = {
    validateToken: function(authToken,callback) {
        jwt.verify(authToken, 'Saravana', function(err, decoded) {
            if (err) {
                callback({ success: false, err: err })
            } else {
                callback({ success: true, res: decoded });
            }
        });

    }
}
