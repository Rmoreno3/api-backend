const bcrypt = require('bcrypt')
const User = require('../models/User')

const createUser = async (req, res) => {
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

module.exports = createUser
