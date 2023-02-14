const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = request.token
    ? jwt.verify(request.token, process.env.SECRET)
    : null

  request.user = decodedToken ? await User.findById(decodedToken.id) : null

  next()
}

//ErrorHandler needs to be last defined middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { errorHandler, tokenExtractor, userExtractor }