const express = require('express')
const router = express.Router()

const createUser = require('./routesUsers')

router.post('/', createUser)

module.exports = router
