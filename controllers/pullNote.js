const pullNote = require('express').Router()
const Note = require('../models/Note')

pullNote.get('/', (req, response, next) => {
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

module.exports = pullNote
