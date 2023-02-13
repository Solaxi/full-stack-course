const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.blogList) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('getting blogs', () => {
  test('can get all blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length)
      .toBe(helper.blogList.length)
  })

  test('Mongoose _id is renamed to id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    expect(blogsAtStart[0].id)
      .toBeDefined()
    expect(blogsAtStart[0]._id)
      .not.toBeDefined()
  })
})

describe('adding blog posts', () => {
  test('succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length)
      .toBe(helper.blogList.length + 1)

    const createdBlog = blogsAtEnd.find(b => b.title === helper.newBlog.title)
    expect(createdBlog).toBeDefined()
    expect(createdBlog.author).toBe(helper.newBlog.author)
    expect(createdBlog.url).toBe(helper.newBlog.url)
    expect(createdBlog.likes).toBe(helper.newBlog.likes)
  })

  test('new blog without likes defaults to 0 likes', async () => {
    const newBlogWithoutLikes = {
      title: helper.newBlog.title,
      author: helper.newBlog.author,
      url: helper.newBlog.url
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(savedBlog.body.likes).toBe(0)
  })

  test('fails with 400 if no title', async () => {
    const newBlogWithoutTitle = {
      author: helper.newBlog.author,
      url: helper.newBlog.url
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)
  })

  test('fails with 400 if no url', async () => {
    const newBlogWithoutUrl = {
      title: helper.newBlog.title,
      author: helper.newBlog.author
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
  })
})

describe('deleting blogs', () => {
  test('succeeds to delete with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.map(b => b.title))
      .not.toContain(blogToDelete.title)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})