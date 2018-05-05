const jwt = require('jsonwebtoken')
const Resume = require('./models/resume')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

exports.listUsers = function (req, res) {
  User.find()
    .exec()
    .then(users => {
      res
        .status(200)
        .json({
          users: users.map(user => {
            return {
              ...user._doc,
              requestReg: {
                name: 'Получить полную информацию о пользователе',
                type: 'GET',
                url: `http://localhost:5000/api/regs/${user._id}`,
              },
              requestResumes: {
                name: 'Получить все резюме пользователя',
                type: 'GET',
                url: `http://localhost:5000/api/resume/by/${user.login}`,
              },
            }
          }),
        })
    })
    .catch(err => default500Error(res, err))
}

exports.addResume = function (req, res) {
  jwt.verify(req.token, SECRET_KEY, (error, user) => {
    if (error) {
      res.status(403) // Forbidden
    } else {
      const user = new Resume({
        profession: req.body.profession,
        email: req.body.email,
        phone: req.body.phone,
        accounts: {
          github: req.body.github,
          medium: req.body.medium,
          vk: req.body.vk,
          linkedin: req.body.linkedin,
          twitter: req.body.twitter,
          facebook: req.body.facebook,
          skype: req.body.skype,
          telegram: req.body.telegram,
        },
        owner: req.params.owner
      })
      user.save()
        .then(result => {
          res.status(200)
            .json({
              message: 'Резюме успешно добавлено!',
              resume: result,
            })
        })
        .catch(err => default500Error(res, err))
    }
  })
}

exports.listResumes = function (req, res) {
  Resume.find()
    .exec()
    .then(resumes => {
      res.status(200)
        .json({
          resumes: resumes.map(resume => {
            return {
              ...resume._doc,
              request: {
                type: 'GET',
                url: `http://localhost:5000/api/resumes/${resume._id}`,
              },
            }
          }),
        })
    })
    .catch(err => default500Error(res, err))
}

exports.resumeId = function (req, res) {
  Resume.findById(req.params.resumeId)
    .exec()
    .then(resume => {
      res.status(200)
        .json({
          resume: resume,
          request: {
            name: 'Получить все резюме по `userId`',
            type: 'GET',
            url: `http://localhost:5000/api/resumes`,
          },
        })
    })
    .catch(err => default500Error(res, err))
}

exports.userId = function (req, res) {
  User.findOne({
    _id: req.params.userId,
  })
    .exec()
    .then(user => {
      res.status(200)
        .json({
          user: user,
          request: {
            name: `Получить все резюме пользователя`,
            type: 'GET',
            url: `http://localhost:5000/api/regs/resume/${user.login}`,
          },
        })
    })
    .catch(err => default500Error(res, err))
}

exports.getResumesByOwner = function (req, res) {
  Resume.find({owner: req.params.owner})
    .exec()
    .then(result => {
      if (result.length > 0) {
        res.status(200)
          .json(result)
      } else {
        res.status(204)
          .json({
            message: 'Не найдено резюме у пользователя',
            data: null,
          })
      }
    })
    .catch(err => default500Error(res, err))
}

function default500Error(res, err) {
  console.log(err)
  res.status(500)
    .json({
      error: err,
    })
}
