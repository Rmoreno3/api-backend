module.exports = (error, request, response, next) => {
  console.error(error.name)
  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'id used is malformed'
    })
  } else if (error.name === 'ValidationError') {
    response.status(409).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'token missing or invalid' })
  } else if (error.name === 'TypeError') {
    response.status(400).send({ error: 'error' })
  } else {
    response.status(500).end()
  }
}
