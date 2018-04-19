const express = require('express');
const router = express.Router();
const {default500Error} = require('./utils')

router.get('/:userId', getUserById);
// router.delete('/:userId', deleteUserById);
// router.put('/:userId', putUserById);
// router.patch('/:userId', updateUserById); //смена пароля, например
// router.post('/:userId', postUserById)


router.get('/:owner', getUserByOwner);

function getUserByOwner(req, res) {
  User.findOne({owner: req.params.owner})
    .exec()
    .then(user => {
      if (user) res.status(200).json(user)
      else res.status(204)
    })
    .catch(e => default500Error(res, e))
}

function getUserById (req, res) {
  User.findById(req.params.userId)
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
