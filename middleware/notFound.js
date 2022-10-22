module.exports = (req, response, next) => {
  response.status(404).send({
    error: 'Not Found'
  })
}
