const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const uristring = /*process.env.MONGOLAB_URI || */ 'mongodb://heroku_47zcn25r:25l8np37nbpfdoqq28dv42n69b@ds147518.mlab.com:47518/heroku_47zcn25r'

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
app.post('/api/users', api.post)
app.get('/api/users/accounts/github/:github', api.findByGithubAccount)
app.get('/api/users/name/:first', api.show)
app.get('/api/users/:id', api.findById)
app.get('/api/users', api.list)
app.delete('/api/eraseDB', (req, res) => {res.sendStatus(501)})
app.get('/', (req, res) => {
  console.log('/');
  res.sendStatus(200);
})
app.get('/welcome', (req, res) => {
  res.json({
    message: "welcome to /welcome"
  })
})
app.post('/welcome/post', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) => {
    if (error) {
      res.sendStatus(403)
    } else {
      res.json({
        message: "post created",
        authData: authData
      })
    }
  })

})
app.post('/api/login', (req, res) => {
  // mock user
  const user = {
    id: 1,
    username: 'andrey',
    email: 'kek@mail.ru'
  }
  jwt.sign({user: user}, 'secretkey', (err, token) => {
    res.send(token)
  })
})

/* FORMAT TOKEN
* Authorization: Bearer <access_token>
*/

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

//присоединямся к бд
mongoose.connect(uristring, function(error, response) {
  if (error) {
    console.log('Не смог присоединиться к MongoDB ' + uristring + '. ' + error)
  } else {
    console.log('Установлено соединение: ' + uristring)
  }
})

app.listen(port, function () {
  console.log('Listening on port: ' + port)
})