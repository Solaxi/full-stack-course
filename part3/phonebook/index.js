let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

const morgan = require("morgan")
morgan.token('post-data', (request, response) => {
    if (request.method === "POST") {
        return JSON.stringify(request.body)
    }
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-data"))

/*
GET all persons as JSON
*/
app.get("/api/persons", (request, response) => {
    response.json(persons)
})

/*
GET phonebook status information
*/
app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has ${persons.length} entries</p><p>${new Date()}</p>`)
})

/*
GET a person with a spesific ID
*/
app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    console.log(`Finding person with id ${id}`);
    const person = persons.find(p => p.id === Number(id))
    if (!person) {
        response.statusMessage = `Person ${id} was not found`
        return response.status(404).end()
    }

    response.json(person)
})

/*
DELETE person with a spesific ID
*/
app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    console.log(`Deleting person with id ${id}`);
    persons = persons.filter(p => p.id !== Number(id))
    response.status(204).end()
})

/*
POST a new person
*/
app.post("/api/persons", (request, response) => {
    const body = request.body
    console.log("Trying to add person ", body);

    if (!body.name) {
        return response.status(400).json({ error: 'name is empty'})
    }

    if (persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({ error: 'name must be unique'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 99999)
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
