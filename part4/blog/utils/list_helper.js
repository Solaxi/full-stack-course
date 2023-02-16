const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const countLikes = (sum, blog) => sum + blog.likes

  return blogs.reduce(countLikes, 0)
}

const favouriteBlog = (blogs) => {
  const favourite = (fav, blog) => blog.likes > fav.likes ? blog : fav

  return blogs.length === 0
    ? undefined
    : blogs.reduce(favourite, blogs[0])
}

const mostBlogs = (blogs) => {
  const blogCountByAuthor = lodash.countBy(blogs, 'author')

  return lodash.transform(blogCountByAuthor, (result, value, key) => {
    if (value > result.blogs) {
      result.blogs = value
      result.author = key
    }
  }, { author: '', blogs: 0 })
}

const mostLikes = (blogs) => {
  const blogsByAuthor = lodash.groupBy(blogs, 'author')

  return lodash.transform(blogsByAuthor, (result, value, key) => {
    const totalLikes = value.reduce((likes, blog) => likes + blog.likes, 0)
    if (totalLikes > result.likes) {
      result.likes = totalLikes
      result.author = key
    }
  }, { author: '', likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}