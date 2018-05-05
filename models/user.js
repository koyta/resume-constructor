const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  login: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  fullname: {
    firstname: {type: String, required: true},
    secondname: {type: String, required: true}
  },
  date_of_birth: {type: Number, required: false},
})

UserSchema.pre('save', function (next) {
  const reg = this
// only hash the password if it has been modified (or is new)
  if (!reg.isModified('password')) return next()

// generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    // hash the password along with our new salt
    bcrypt.hash(reg.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      reg.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('User', UserSchema)
