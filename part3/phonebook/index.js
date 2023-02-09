require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

const Person = require('./models/person')

//use morgan to log app requests
const morgan = require('morgan')
morgan.token('post-data', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

/*
GET all persons
*/
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(error))
})

/*
GET phonebook status information
*/
app.get('/info', (request, response, next) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has ${persons.length} entries</p><p>${new Date()}</p>`)
  })
    .catch(error => next(error))
})

/*
GET a person with a spesific ID
*/
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log(`Finding person with id ${id}`)

  Person.findById(id).then(person => {
    if (!person) {
      response.statusMessage = `Person ${id} was not found`
      return response.status(404).end()
    }

    response.json(person)
  })
    .catch(error => next(error))
})

/*
DELETE person with a spesific ID
*/
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log(`Deleting person with id ${id}`)

  Person.findByIdAndDelete(id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))
})

/*
POST a new person
*/
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log('Trying to add person ', body)

  Person.find({ name: body.name }).then(existing => {
    if (existing) {
      console.log(`Person with name ${body.name} exists!`)
      return response.status(400).json({ error: 'Name must be unique' }).end()
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
      .catch(error => next(error))
  })
})

/*
PUT new person info into existing one
*/
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  console.log(`Trying to update ${body.name}`)

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, person, { new: true, runValidators:true, context:'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


//errorHandler middleware is added last
const errorHandler = (error, request, response, next) => {
  console.error(error.name, error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error:'invalid id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)