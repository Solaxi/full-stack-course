const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await new User(helper.initialUser).save()
})

describe('adding new users', () => {
  test('new user can be added with valid info', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'salasana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const addedUser = usersAtEnd.find(u => u.username === newUser.username)
    expect(addedUser.name).toBe(newUser.name)
  })

  test('adding user fails with 400 if username too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'es',
      name: 'New User',
      password: 'salasana'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error)
      .toContain('username: must be at least 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('adding user fails with 400 if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error)
      .toContain('Password must be at least 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('adding user fails if username exists', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: helper.initialUser.username,
      name: 'New User',
      password: 'salasana'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error)
      .toContain('expected `username` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('get all users', () => {
  test('list users from db', async () => {
    const users = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(users.body).toHaveLength(1)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})