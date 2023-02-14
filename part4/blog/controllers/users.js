const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const logger = require('../utils/logger')
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  logger.info(`Creating new user ${username}`)

  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({ error: 'User validation failed: Password must be at least 3 characters long' }).end()
  }

  const SALT_ROUNDS = 10
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  const newUser = new User({ username, name, passwordHash })
  const savedUser = await newUser.save()

  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1 })
  return response.json(users)
})

module.exports = userRouter