const express = require('express');
const router = express.Router();
const {verifyToken, default500Error} = require('./utils');
const {SECRET_KEY} = require('./constants')
const jwt = require('jsonwebtoken')
const Resume = require('../models/resume')

router.get('/:resumeId', getResumeById);
router.post('/:owner', verifyToken, addResume);
router.delete('/:resumeId', deleteResumeById);
router.patch('/:resumeId', updateResumeById);
router.put('/:resumeId', putResumeById);


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
      res.status(200).json({resume})
    })
    .catch(err => default500Error(res, err))
}


function addResume(req, res) {
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

module.exports = router;
