/* The API controller
   Exports 3 methods:
   * post - Creates a new user
   * list - Returns a list of users
   * show - Displays a user info
*/
const assert = require('assert');

const User = require('./models/user.js')

exports.post = function (req, res) {
  const user = new User({
    name: {
      first: req.body.first,
      second: req.body.second,
    },
    profession: req.body.profession,
    date_of_birth: req.body.date_of_birth,
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
      telegram: req.body.telegram
    }
  })

  user
    .save()
    .then(result => {
      res.status(201).json({
        message: "Handling POST messages to /users",
        createdUser: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err.message
      })
    })
}

exports.list = function (req, res) {
  User.find(function (err, user) {
    res.send(user)
  })
}

exports.findById = function (req, res) {
  User.findById(req.params.id)
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).send(result)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.findByGithubAccount = (req, res) => {
  User.find({
      accounts: {
        github: req.params.github
      }
    })
    .exec()
    .then(result => {
      if (result) {
        res.status(200).send(result)
      } else {
        res.status(404).send({
          message: "User not found"
        })
      }
    })
    .catch(err => res.status(500).send(err))
}

exports.show = (req, res) => {
  console.log(req.params)
  if (req.params.first) {
    console.log('name.first: ', decodeURI(req.params.first))
    User.find({
        name: {
          first: decodeURI(req.params.first)
        }
      })
      .exec()
      .then(result => {
        console.log('result: ' + result)
        if (result) res.status(200).send(json(result))
        else res.status(404).send(json({
          message: 'User not found by: ' + decodeURI(req.params.first)
        }))
      })
      .catch(error => {
        res.status(500).send(json({
          error: error.message
        }))
      })
  } else if (req.params.github) {
    User.find({
        accounts: {
          github: req.params.github
        }
      })
      .exec()
      .then(result => {
        if (!result) {
          res.send(404).send(json({
            message: 'User not found by: ' + req.params.first
          }))
        }

        res.status(200).send(json(result))
      })
  }
}

// locates a user by id (lul)
exports.showById = function (req, res) {
  User.findOne({
    _id: req.params.id
  })
}

exports.eraseDB = function (req, res) {

}