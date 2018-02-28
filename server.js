const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

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