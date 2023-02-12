const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const countLikes = (sum, blog) => sum + blog.likes

  return blogs.reduce(countLikes, 0)
}

module.exports = { dummy, totalLikes }