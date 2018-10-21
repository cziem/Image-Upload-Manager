const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { User, validateUser } = require('../models/user')

exports.signup = async (req, res) => {
  const { error } = validateUser(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message })

  let user = await User.findOne({ email: req.body.email })

  if (user) return res.status(500).send('User with email already exists')

  user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  const token = user.generateToken()

  try {
    const userDetails = await user.save()
    res.status(201).json({
      credentials: {
        id: userDetails._id,
        token
      },
      message: 'new user created',
      name: userDetails.name,
      username: userDetails.username,
      email: userDetails.email
    })
  } catch (error) {
    res.status(500).send('an error occurred' + error)
  }
}