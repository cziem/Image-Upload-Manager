const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
})

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    expiresIn: '1h'
  })
  return token
}

const validateUser = user => {
  const schema = {
    name: Joi.string().required(),
    username: Joi.string()
      .alphanum()
      .min(5)
      .max(15)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
  }

  return Joi.validate(user, schema)
}

const User = mongoose.model('User', userSchema)

module.exports = {
  User,
  validateUser
}