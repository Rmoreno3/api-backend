const bcrypt = require('bcrypt')
const User = require('../models/User')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'reyTest', password: passwordHash })

    await user.save()
  })

  test('should ', () => {

  })
})
