var express = require('express');
var router = express.Router();


var ctrlAuth = require('../controllers/authentication');
var ctrlUser = require('../controllers/userctrl');


router.post('/register', ctrlAuth.register);
router.post('/authenticate', ctrlAuth.login);
router.post('/addtoken', ctrlUser.addtoken);
router.get('/sendnotification', ctrlUser.sendnotification);

module.exports = router;
