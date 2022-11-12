const express = require('express')
const router = express.Router()

const {
  getNote,
  getNotes,
  createNote,
  updateNote,
  deleteNote
} = require('./routesNotes')

router.get('/', getNotes)

router.get('/:id', getNote)

router.post('/', createNote)

router.put('/:id', updateNote)

router.delete('/:id', deleteNote)

module.exports = router
