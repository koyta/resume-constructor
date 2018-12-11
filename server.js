if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const authRouter = require("./routes/authRouter");
const mainRouter = require("./routes/mainRouter");
const userRouter = require("./routes/userRouter");
const resumeRouter = require("./routes/resumeRouter");
const github = require("./strategies/github");
const api = require("./api.js");
const uristring = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;
const app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", mainRouter);
app.use("/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/resume", resumeRouter);
app.use(express.static(path.join(__dirname, "client/build"))); // Serve static files from client build
app.get("/api/resumes", api.listResumes);
app.get("/api/users", api.listUsers);

mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(
  uristring,
  function(error, response) {
    try {
      if (!error) console.log("Установлено соединение: " + uristring);
    } catch (e) {
      console.log(
        "Не смог присоединиться к MongoDB " + uristring + ". " + error
      );
    }
  }
);

app.listen(port, function() {
  console.log("Listening on port: " + port);
});
