// The User model

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    second: {
      type: String,
      required: true
    },
  },
  profession: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Number, //Unix time
  },
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: Number
  },
  accounts: {
    github: {
      type: String,
      trim: true
    },
    medium: {
      type: String,
      trim: true
    },
    vk: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    facebook: {
      type: String,
      trim: true
    },
    skype: {
      type: String,
      trim: true
    },
    telegram: {
      type: String,
      trim: true
    }
  }
})

userSchema.pre('validate', function (next) {
  if (this.email || this.phone) {
    next();
  } else {
    next(new Error('Email or Phone should be required.'));
  }
})

module.exports = mongoose.model('User', userSchema)