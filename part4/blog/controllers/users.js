const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const logger = require('../utils/logger')
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  logger.info(`Creating new user ${username}`)

  const SALT_ROUNDS = 10
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  const newUser = new User({ username, name, passwordHash })
  const savedUser = await newUser.save()

  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  return response.json(users)
})

module.exports = userRouter