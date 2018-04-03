const assert = require('assert')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const Registration = require('./models/registration')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const SALT_WORK_FACTOR = 10
const secretKey = 'secret'

exports.signup = function (req, res) {
  const registration = new Registration({
    _id: mongoose.Types.ObjectId(),
    login: req.body.login,
    password: req.body.password,
  })
  console.log(req.body)
  registration.save()
    .then(reg => {
      res.sendStatus(200)
    })
    .catch(err => default500Error(res, err))
}

exports.login = function (req, res) {
  Registration.findOne({login: req.body.login})
    .exec()
    .then(user => {
      if (!user) {
        res
          .status(401)
          .json({
            message: 'No such user found',
          })
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(answer => {
            if (answer) {
              const token = jwt.sign({id: user._id, login: user.login}, secretKey,
                {expiresIn: '24h'})
              res.status(200)
                .json({
                  token: token,
                })
            } else {
              res.status(401)
                .json({
                  message: 'Passwords did not match',
                  answer,
                })
            }
          })
      }
    })
    .catch(err => default500Error(res, err))
}

exports.listRegs = function (req, res) {
  Registration.find()
    .exec()
    .then(regs => {
      res.status(200)
        .json({
          registrations: regs.map(reg => {
            return {
              ...reg._doc,
              requestReg: {
                name: 'Get full reg info',
                type: 'GET',
                url: `http://localhost:5000/api/regs/${reg._id}`,
              },
              requestResumes: {
                name: 'Get all resumes of registration',
                type: 'GET',
                url: `http://localhost:5000/api/resume/owner/${reg.login}`,
              },
            }
          }),
        })
    })
    .catch(err => default500Error(res, err))
}

exports.addResume = function (req, res) {
  jwt.verify(req.token, secretKey, (error, user) => {
    if (error) {
      res.status(403)
    } else {
      const user = new User({
        name: {
          first: res.body.first,
          second: res.body.second,
        },
        profession: res.body.profession,
        date_of_birth: res.body.date_of_birth,
        email: res.body.email,
        phone: res.body.phone,
        accounts: {
          github: res.body.github,
          medium: res.body.medium,
          vk: res.body.vk,
          linkedin: res.body.linkedin,
          twitter: res.body.twitter,
          facebook: res.body.facebook,
          skype: res.body.skype,
          telegram: res.body.telegram,
        },
      })
      user.save()
        .then(result => {
          res.status(200)
            .json({
              message: 'Resume added successfully',
              new_resume: result,
            })
        })
        .catch(err => default500Error(res, err))
    }
  })
}

exports.listUsers = function (req, res) {
  User.find()
    .exec()
    .then(users => {
      res.status(200)
        .json({
          users: users.map(user => {
            return {
              ...user._doc,
              request: {
                type: 'GET',
                url: `http://localhost:5000/api/users/${user._id}`,
              },
            }
          }),
        })
    })
    .catch(err => default500Error(res, err))
}

exports.userId = function (req, res) {
  User.findById(req.params.userId)
    .exec()
    .then(user => {
      res.status(200)
        .json({
          user: user,
          request: {
            name: 'All users',
            type: 'GET',
            url: `http://localhost:5000/api/users`,
          },
        })
    })
    .catch(err => default500Error(res, err))
}

exports.registrationId = function (req, res) {
  Registration.findOne({
    _id: req.params.regId,
  })
    .exec()
    .then(result => {
      res.status(200)
        .json({
          registration: result,
          request: {
            name: 'Owner\'s resumes',
            type: 'GET',
            url: `http://localhost:5000/api/regs/resume/${result.login}`,
          },
        })
    })
    .catch(err => default500Error(res, err))
}

exports.findResumes = function (req, res) {
  User.find({owner: req.params.owner})
    .exec()
    .then(result => {
      if (result.length > 0) {
        res.status(200)
          .json(result)
      } else {
        res.status(204)
          .json({
            message: 'No entries found',
            data: null,
          })
      }
    })
    .catch(err => default500Error(res, err))
}

function default500Error (res, err) {
  console.log(err)
  res.status(500)
    .json({
      error: err,
    })
}
