const express = require('express');
const router = express.Router();
const {default500Error} = require('./utils')

router.get('/:userId', getUserById);


function getUserById (req, res) {
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

module.exports = router;
