const router = require('express').Router();
const userHttpHandler = require('./user.http')
const passport = require('passport');
const config = require('../config');
require('../tools/auth')(passport)


router.route('/')
    .get( passport.authenticate('jwt', config.jwtSecret) ,userHttpHandler.getAllUsers)

    


module.exports = {
    router
}