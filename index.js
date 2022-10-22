require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/Note')
const notFound = require('./middleware/notFound')
const handleErros = require('./middleware/handleErrors')

app.use(cors())
app.use(express.json())

app.get('/', (req, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, response, next) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    }).catch(error => {
      next(error)
    })
})

app.get('/api/notes/:id', (req, response, next) => {
  const { id } = req.params
  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    }).catch(error => {
      next(error)
    })
})

app.put('/api/notes/:id', (req, response, next) => {
  const { id } = req.params
  const note = req.body
  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    }).catch(error => {
      next(error)
    })
})

app.delete('/api/notes/:id', (req, response, next) => {
  const { id } = req.params
  Note.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (req, response, next) => {
  const note = req.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  })

  newNote.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    }).catch(error => next(error))
})

// MANEJO DE ERROR EN CASO DE NO MATCHEAR CON NINGUN PATH

app.use(notFound)

// MANEJO DE ERROR EN CASO DE PASAR MAL LA INFO

app.use(handleErros)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running o port ${PORT}`)
})
