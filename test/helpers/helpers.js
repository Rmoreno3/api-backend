const { app } = require('../../index')
const supertest = require('supertest')

const api = supertest(app)

const initialNotes = [
  {
    content: 'Aprendiendo fullstack con midu',
    important: true,
    date: new Date()
  },
  {
    content: 'El mundial de catar',
    important: true,
    date: new Date()
  }
]

const getAllContentNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const getIdNote = async () => {
  const response = await api.get('/api/notes')
  const id = response.body.map(note => note.id)
  const ultimateId = id[0]
  return ultimateId
}

module.exports = {
  api,
  initialNotes,
  getAllContentNotes,
  getIdNote
}
