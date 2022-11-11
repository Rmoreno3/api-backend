const deleteNote = require('express').Router()
const Note = require('../models/Note')

deleteNote.delete('/', (req, response, next) => {
  const { id } = req.params
  Note.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = deleteNote
