const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogIdToDelete = request.params.id
  logger.info(`Deleting note ${blogIdToDelete}`)

  await Blog.findOneAndDelete(blogIdToDelete)
  response.status(204).end()
})

module.exports = blogRouter
