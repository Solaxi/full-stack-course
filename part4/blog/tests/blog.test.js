const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
  expect(listHelper.dummy([]))
    .toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([]))
      .toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes([testHelper.blogList[0]]))
      .toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(testHelper.blogList))
      .toBe(36)
  })
})

describe('favourite blog', () => {
  test('of empty is empty', () => {
    expect(listHelper.favouriteBlog([]))
      .toBe(undefined)
  })

  test('when list has only one blog', () => {
    expect(listHelper.favouriteBlog([testHelper.blogList[0]]))
      .toEqual(testHelper.blogList[0])
  })

  test('of a bigger list select favourite', () => {
    expect(listHelper.favouriteBlog(testHelper.blogList))
      .toBe(testHelper.blogList[2])
  })
})

describe('most blogs', () => {
  test('who has most blogs and how many', async () => {
    expect(listHelper.mostBlogs(testHelper.blogList))
      .toEqual( { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('who has most likes across all the blogs and how many', async () => {
    expect(listHelper.mostLikes(testHelper.blogList))
      .toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})