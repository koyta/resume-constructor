const express = require("express");
const router = express.Router();
const {default500Error} = require("./utils");
const User = require("../models/user");

router.get("/find/:userId", getUserById);
// router.delete('/:userId', deleteUserById);
// router.put('/:userId', putUserById);
// router.patch('/:userId', updateUserById); //смена пароля, например
// router.post('/:userId', postUserById)
// router.get("", resolveQuery);
router.get("/:login/profile", getUserByLogin);
// router.get('/:login/id', getUserIdByLogin);

// function resolveQuery(req, res) {
//   const query = req.query;
//   getUserByLogin(req, res);
// }

function getUserById (req, res) {
  User.findById(req.params.userId)
    .exec()
    .then(user => {
      res.status(200)
        .json({
          user: user,
          request: {
            name: "Получить все резюме пользователя",
            type: "GET",
            url: `http://localhost:5000/api/regs/resume/${user.login}`,
          },
        });
    })
    .catch(err => default500Error(res, err));
}

function getUserByLogin(req, res) {
  User.findOne({login: req.params.login}, "fullname _id login date_of_birth")
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json(user);
      }
      else res.status(204);
    })
    .catch(e => default500Error(res, e));
}

module.exports = router;
