// The Resume model

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const resumeSchema = new Schema({
  profession: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: Number
  },
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
  },
  skills: {
    type: Object
  },
  experience: {
    dateStart: { type: String, required: true },
    dateEnd: { type: String, required: true },
    employer: { type: String, required: true },
    more: { type: String }
  },
  owner: {
    type: String,
    required: true
  }
})

resumeSchema.pre('validate', function (next) {
  if (this.email || this.phone) {
    next()
  } else {
    next(new Error('Email or Phone: you must specify one of the options'))
  }
})

module.exports = mongoose.model('Resume', resumeSchema)
