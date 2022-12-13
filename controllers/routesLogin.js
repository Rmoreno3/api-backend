const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const loginUser = async (request, response, next) => {
  const { body } = request
  const { username, password } = body

  try {
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      response.status(401).json({
        error: 'invalid user or password'
      })
    }

    const userForToken = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '7d' })

    response.send({
      name: user.name,
      username: user.username,
      token
    })
  } catch (e) {
    next()
  }
}

module.exports = loginUser
