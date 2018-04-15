// @flow

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const mainRouter = require('./routes/mainRouter')
const userRouter = require('./routes/userRouter')
const resumeRouter = require('./routes/resumeRouter')
const api = require('./api.js');
const uristring = /*process.env.MONGOLAB_URI || */ 'mongodb://heroku_47zcn25r:25l8np37nbpfdoqq28dv42n69b@ds147518.mlab.com:47518/heroku_47zcn25r';
const port = process.env.PORT || 5000;


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: false,
}));
app.use('/api', mainRouter)
app.use('/api/user', userRouter)
app.use('/api/resume', resumeRouter)
app.get('/api/resumes', api.listResumes);
app.get('/api/users', api.listUsers);


// MONGOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOSE
mongoose.Promise = global.Promise;
mongoose.connect(uristring, function (error, response) {
  try {
    if (!error)
      console.log('Установлено соединение: ' + uristring)
  } catch (e) {
    console.log('Не смог присоединиться к MongoDB ' + uristring + '. ' + error)
  }
});

app.listen(port, function () {
  console.log('Listening on port: ' + port)
});
