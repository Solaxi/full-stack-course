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

module.exports = { dummy, totalLikes, favouriteBlog }