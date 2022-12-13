const express = require('express')
const router = express.Router()

const loginUser = require('./routesLogin')

router.post('/', loginUser)

module.exports = router
