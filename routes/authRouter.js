const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const github = require("../strategies/github");
const {default500Error} = require("./utils");
const {SECRET_KEY} = require("./constants");

router.get("/github", passport.authenticate("github", {display: "popup"}));
router.get("/github/callback", passport.authenticate("github", {
  successRedirect: "http://localhost:3000/github-analyser",
  failureRedirect: "/failure"
}));

module.exports = router;
