const mongoose = require('mongoose')
const { server } = require('../index')
const Note = require('../models/Note')
const { api, initialNotes, getAllContentNotes, getIdNote } = require('./helpers/helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()

  const note2 = new Note(initialNotes[1])
  await note2.save()
}, 60000)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const { response } = await getAllContentNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about midu', async () => {
  const { contents } = await getAllContentNotes()

  expect(contents).toContain('Aprendiendo fullstack con midu')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'Nota creada',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const { contents, response } = await getAllContentNotes()
  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})

test('note without contetn is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const { response } = await getAllContentNotes()

  expect(response.body).toHaveLength(initialNotes.length)
})

test('delete Note', async () => {
  const deleteIdNote = await getIdNote()

  await api
    .delete(`/api/notes/${deleteIdNote}`)
    .expect(204)

  const { response } = await getAllContentNotes()

  expect(response.body).toHaveLength(initialNotes.length - 1)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
