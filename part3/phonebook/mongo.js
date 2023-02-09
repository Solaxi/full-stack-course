/*
    Exercise 3.12. from https://fullstackopen.com/en/part3/saving_data_to_mongo_db

    List all persons
    node mongo.js YOURPASSWORD

    Add new person:
    node mongo.js YOURPASSWORD Anna 555-666777

*/

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please give pw as an argument')
  process.exit(1)
}
const pw = process.argv[2]
const url = `mongodb+srv://fullstack:${pw}@cluster0.w1su2nx.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

/* If name and number are given, create new */
const name = process.argv[3]
const number = process.argv[4]
if (name && number) {
  const person = new Person({ name, number })
  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

/* Else list all*/
} else {
  Person.find({}).then(result => {
    console.log(`Phonebook (${result.length} entries):`)
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
