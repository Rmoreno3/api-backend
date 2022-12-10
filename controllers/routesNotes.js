const Note = require('../models/Note')
const User = require('../models/User')

const getNotes = (req, response, next) => {
  Note.find({}).populate('user', { username: 1, name: 1 })
    .then(notes => {
      response.json(notes)
    }).catch(error => {
      next(error)
    })
}

const getNote = (req, response, next) => {
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
}

const createNote = async (req, response, next) => {
  const { content, important = false, userId } = req.body

  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content,
    important,
    date: new Date().toISOString(),
    user: user._id
  })

  try {
    const savedNote = await newNote.save()
    user.note = user.note.concat(savedNote._id)
    await user.save()
    response.json(savedNote)
  } catch (error) {
    next(error)
  }

  // newNote.save()
  //   .then(savedNote => {
  //     response.status(201).json(savedNote)
  //   }).catch(error => next(error))
}

const updateNote = (req, response, next) => {
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
}

const deleteNote = (req, response, next) => {
  const { id } = req.params
  Note.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
}

module.exports = {
  getNote,
  getNotes,
  createNote,
  updateNote,
  deleteNote
}
