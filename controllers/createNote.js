const createNote = require('express').Router()
const Note = require('../models/Note')

createNote.post('/', (req, response, next) => {
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

module.exports = createNote
