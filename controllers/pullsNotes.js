const pullsNotes = require('express').Router()
const Note = require('../models/Note')

pullsNotes.get('/', (req, response, next) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    }).catch(error => {
      next(error)
    })
})

module.exports = pullsNotes
