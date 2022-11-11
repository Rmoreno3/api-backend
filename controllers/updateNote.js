const updateNote = require('express').Router()
const Note = require('../models/Note')

updateNote.put('/', (req, response, next) => {
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

module.exports = updateNote
