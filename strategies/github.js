const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
const Resume = require('../models/resume');
const { default500Error } = require("../routes/utils");

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
  clientID: process.env.GH_CLIENT_ID,
  clientSecret: process.env.GH_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:5000/auth/github/callback"
},
  (accessToken, refreshToken, profile, done) => {
    console.log('====================================');
    Resume.find({'accounts.github': profile.username})
      .exec()
      .then(resume => {
        if (resume.length > 0) {
          console.log("resume: ", resume);
          User.find({login: resume.owner})
            .then(user => {
              console.log(user);
            })
        } else {
          console.log('User not found');
        }
      })  
    process.nextTick(function () {

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));
