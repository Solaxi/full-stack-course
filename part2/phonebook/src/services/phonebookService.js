import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios
  .get(baseUrl)
  .then(response => response.data)

const create = newObject => axios
  .post(baseUrl, newObject)
  .then(response => response.data)

const remove = id => axios
  .delete(`${baseUrl}/${id}`)
  .then(response => response.status === 200)

const update = newObject => axios
  .put(`${baseUrl}/${newObject.id}`, newObject)
  .then(response => response.data)

export default {
  getAll, create, remove, update
}