const express = require('express');
const router = express.Router();
const {verifyToken, default500Error} = require('./utils');
const {SECRET_KEY} = require('./constants')
const jwt = require('jsonwebtoken')
const Resume = require('../models/resume')
const User = require('../models/user')

router.get('/:resumeId', getResumeById);
router.post('/:owner', verifyToken, addResume);
router.delete('/:resumeId', deleteResumeById);
router.patch('/:resumeId', updateResumeById);
router.put('/:resumeId', putResumeById);
router.get('/by/:owner', getAllResumesIdByOwner);
router.get('/:owner/id', getUserIdByOwner);


function getUserIdByOwner(request, response) {
  User.findOne({
    login: request.params.owner
  })
    .exec()
    .then(user => {
      if (!user) response.status(204).json(user)
      response.status(200).json(user);
    })
    .catch(error => default500Error(response, error))
}

function putResumeById(req, res) {
  Resume.findByIdAndUpdate(
    req.params.resumeId,
    req.body,
    {new: true},
  )
    .exec()
    .then(result => {
      res.send(200).json({result})
    })
}

function updateResumeById(req, res) {
  console.log("update body: ", req.body)
  res.sendStatus(200);
  // Resume.update({_id: req.params.resumeId}, {
  // })
}

function deleteResumeById(req, res) {
  Resume.findByIdAndRemove(req.params.resumeId)
    .exec()
    .then(result => {
      res.status(200).json({
        message: "deleted",
        result
      })
    })
}

function getResumeById(req, res) {
  Resume.findById(req.params.resumeId)
    .exec()
    .then(resume => {
      res.status(200).json(resume)
    })
    .catch(err => default500Error(res, err))
}

function getAllResumesIdByOwner(request, response) {
  Resume.find({owner: request.params.owner}, '_id')
    .exec()
    .then(resumesId => {
      if (resumesId.length > 0) {
        response.status(200).json(
          resumesId.map(resumeId => {
            return {
              data: resumeId,
              request: {
                type: "GET",
                url: `http://localhost:5000/api/resume/${resumeId._id}`
              }
            }
          })
        )
      } else {
        response.sendStatus(204)
      }
    })
    .catch(error => default500Error(response, error))
}

function addResume(req, res) {
  jwt.verify(req.token, SECRET_KEY, (error, tokenData) => {
    if (error) {
      res.status(403) // Forbidden
    } else {
      console.log("token data: ", tokenData);
      const user = new Resume({
        profession: req.body.profession,
        email: req.body.email,
        phone: req.body.phone,
        github: req.body.github,
        medium: req.body.medium,
        telegram: req.body.telegram,
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

module.exports = router;
