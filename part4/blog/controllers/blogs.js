const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({ title, author, url, likes, user: user._id })
  const newBlog = await blog.save()

  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  response.status(201).json(newBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogIdToDelete = request.params.id
  logger.info(`Deleting blog ${blogIdToDelete}`)

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blogToDelete = await Blog.findById(blogIdToDelete)
  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'unauthorized to delete' })
  }

  await blogToDelete.delete()
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blogIdToUpdate = request.params.id
  const likes = {
    likes: request.body.likes
  }
  logger.info(`Updating blog ${blogIdToUpdate}`)

  const updatedBlog = await Blog.findByIdAndUpdate(blogIdToUpdate, likes, { new:true, runValidators:true, context:'query' })
  response.json(updatedBlog)
})

module.exports = blogRouter
