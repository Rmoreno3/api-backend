require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const notFound = require('./middleware/notFound')
const handleErros = require('./middleware/handleErrors')

// CONTROLLERS DE RUTAS
const createNote = require('./controllers/createNote')
const deleteNote = require('./controllers/deleteNote')
const updateNote = require('./controllers/updateNote')
const pullNote = require('./controllers/pullNote')
const pullsNotes = require('./controllers/pullsNotes')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(express.json())

app.get('/', (req, response) => {
  response.send('<h1>Hello World</h1>')
})

// TRAER NOTAS
app.use('/api/notes', pullsNotes)

// TRAER NOTA
app.use('/api/notes/:id', pullNote)

// ACTUALIZAR NOTA
app.use('/api/notes/:id', updateNote)

// ELIMINAR NOTA
app.use('/api/notes/:id', deleteNote)

// CREAR NOTA
app.use('/api/notes', createNote)

// CREAR USUARIO
app.use('/api/users', usersRouter)

// MANEJO DE ERROR EN CASO DE NO MATCHEAR CON NINGUN PATH

app.use(notFound)

// MANEJO DE ERROR EN CASO DE PASAR MAL LA INFO

app.use(handleErros)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server running o port ${PORT}`)
})

module.exports = { app, server }
