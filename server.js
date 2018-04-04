// @flow
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const uristring = process.env.MONGODB_URI

const port = process.env.PORT || 5000

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: false,
}))

const api = require('./api.js')
// Serve static files from client build
app.use(express.static(path.join(__dirname, "client/build")))

app.post('/api/signup', api.signup)
app.post('/api/login', api.login)
app.post('/api/resume', verifyToken, api.addResume)
app.get('/api/users', api.listUsers)
app.get('/api/regs', api.listRegs)
app.get('/api/users/:userId', api.userId)
app.get('/api/regs/:regId', api.registrationId)
app.get('/api/:owner/resume', api.findResumes)

// app.get('/api/test', verifyToken, (req, res) => {
//   jwt.verify(req.token, 'secret', (error, user) => {
//     if (error) {
//       res.sendStatus(403)
//     } else {
//       res.sendStatus(200)
//     }
//   })
// })
// app.get('/api/token', (req, res) => {
//   jwt.sign({test: 'test'}, 'secret', { expiresIn: '30s' }, (error, token) => {
//     res.status(200).json({token})
//   })
// })

function verifyToken (req, res, next) {
  // get auth header value
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ')
    // Get token from array
    const bearerToken = bearer[1]
    // Set token
    req.token = bearerToken
    next()
  } else {
    // Forbidden
    res.sendStatus(403)
  }
}

mongoose.Promise = global.Promise
mongoose.connect(uristring, function (error, response) {
  try {
    if (!error)
      console.log('Установлено соединение: ' + uristring)
  } catch (e) {
    console.log('Не смог присоединиться к MongoDB ' + uristring + '. ' + error)
  }
})

app.listen(port, function () {
  console.log('Listening on port: ' + port)
})
