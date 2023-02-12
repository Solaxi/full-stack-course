const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const newBlog = {
  title: 'Absolutely new blog post',
  author: 'blog_api.test.js',
  url: 'https://awesomeblog.fi',
  likes: 1
}

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.blogList) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('fetch blogs', () => {
  test('get all blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.blogList.length)
  })

  test('_id is renamed to id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    expect(blogsAtStart[0].id).toBeDefined()
    expect(blogsAtStart[0]._id).not.toBeDefined()
  })
})

describe('add blog posts', () => {
  test('add new blog', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.blogList.length + 1)

    const createdBlog = blogsAtEnd.find(b => b.title === newBlog.title)
    expect(createdBlog).toBeDefined()
    expect(createdBlog.author).toBe(newBlog.author)
    expect(createdBlog.url).toBe(newBlog.url)
    expect(createdBlog.likes).toBe(newBlog.likes)
  })

  test('add new blog without likes', async () => {
    const newBlogWithoutLikes = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(savedBlog.body.likes).toBe(0)
  })

  test('add new blog without title', async () => {
    const newBlogWithoutTitle = {
      author: newBlog.author,
      url: newBlog.url
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)
  })

  test('add new blog without url', async () => {
    const newBlogWithoutUrl = {
      title: newBlog.title,
      author: newBlog.author
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})