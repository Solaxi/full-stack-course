const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany()
  await new User(helper.initialUser).save()
})

describe('login with an existing user', () => {
  test('login succeeds with valid credentials', async () => {
    const validCredentials = {
      username: helper.initialUser.username,
      password: helper.initialUser.password
    }

    const response = await api
      .post('/login')
      .send(validCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
    expect(response.body.username).toContain(helper.initialUser.username)
    expect(response.body.name).toContain(helper.initialUser.name)
  })

  test('login fails with 401 with invalid password', async () => {
    const invalidCredentials = {
      username: helper.initialUser.username,
      password: 'invalidPassword'
    }

    const response = await api
      .post('/login')
      .send(invalidCredentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toEqual('invalid username or password')
  })

  test('login fails with 401 with invalid username', async () => {
    const invalidCredentials = {
      username: 'invalidUsername',
      password: helper.initialUser.password
    }

    const response = await api
      .post('/login')
      .send(invalidCredentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toEqual('invalid username or password')
  })
})

afterAll(async () => {
  mongoose.connection.close()
})