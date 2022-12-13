const bcrypt = require('bcrypt')
const User = require('../models/User')

const getUsers = async (req, res, next) => {
  const users = await User.find({}).populate('note', {
    content: 1,
    date: 1
  })
  res.json(users)
}

const createUser = async (req, res, next) => {
  const { body } = req
  const { username, name, password } = body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.json(savedUser)
}

module.exports = { createUser, getUsers }
