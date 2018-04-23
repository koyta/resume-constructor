const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')
const github = require('../strategies/github');
const {default500Error} = require("./utils");
const {SECRET_KEY} = require('./constants')

router.get('/github', passport.authenticate('github', { display: 'popup',  }), (req, res) => {
    console.log('server!!!!!!!!!!!!!!!!!!')
    res.send('SERVER RESPONSE')
})
router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/failure', successRedirect: '/github-analyser'}))



module.exports = router;
