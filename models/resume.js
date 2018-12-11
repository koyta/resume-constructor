// The Resume model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    type: Object
  },
  medium: {
    type: Object
  },
  skills: {
    type: Array
  },
  experience: {
    type: Object
  },
  owner: {
    type: String,
    required: true
  }
});

resumeSchema.pre("validate", function(next) {
  if (this.email || this.phone) {
    next();
  } else {
    next(new Error("Email or Phone: you must specify one of the options"));
  }
});

module.exports = mongoose.model("Resume", resumeSchema);
