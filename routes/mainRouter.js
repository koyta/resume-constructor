const express = require('express');
const router = express.Router();
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {default500Error, verifyToken} = require("./utils");
const {SECRET_KEY} = require('./constants')


router.get('/login', verifyToken, login)
router.post('/signup', signup)


function signup(request, response) {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    login: request.body.login,
    password: request.body.password,
    fullname: {
      firstname: request.body.firstname,
      secondname: request.body.secondname
    },
    date_of_birth: request.body.date_of_birth
  })
  user.save()
    .then(user => {
      response.status(201).json({user})
    })
    .catch(error => default500Error(response, error))
}

function login(req, res) {
  User.findOne({login: req.body.login})
    .exec()
    .then(user => {
      if (!user) {
        res
          .status(401)
          .json({
            message: 'Нет такого пользователя',
          })
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(answer => {
            if (answer) {
              const token = jwt.sign({id: user._id, login: user.login}, SECRET_KEY,
                {expiresIn: '24h'})
              res.status(200)
                .json({
                  token: token,
                })
            } else {
              res.status(401)
                .json({
                  message: 'Пароли не совпадают',
                  answer,
                })
            }
          })
      }
    })
    .catch(err => default500Error(res, err))
}

module.exports = router;
