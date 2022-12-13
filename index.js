require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

// MIDDLEWARE MANEJO DE ERRORES
const notFound = require('./middleware/notFound')
const handleErros = require('./middleware/handleErrors')

// CONTROLLERS DE RUTAS
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())

app.get('/', (req, response) => {
  response.send('<h1>Hello World</h1>')
})

// CRUD DE NOTAS
app.use('/api/notes', notesRouter)

// CRUD DE USUARIO
app.use('/api/users', usersRouter)

// LOGIN USERS
app.use('/api/login', loginRouter)

// MANEJO DE ERROR EN CASO DE NO MATCHEAR CON NINGUN PATH

app.use(notFound)

// MANEJO DE ERROR EN CASO DE PASAR MAL LA INFO

app.use(handleErros)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server running o port ${PORT}`)
})

module.exports = { app, server }
