
const mongoose = require('mongoose')
const password = require('./password')
const { model, Schema } = mongoose

const connectionString = `mongodb+srv://rmoreno:${password}@cluster0.lumref2.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connectad')
  }).catch(err => console.error(err))

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = model('Note', noteSchema)

const note = new Note({
  content: 'MongoDB es increible',
  date: new Date(),
  important: true
})

note.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(err => console.error(err))
