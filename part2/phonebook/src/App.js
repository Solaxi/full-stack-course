import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")
  const shownPersons = filter === "" ? persons : persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)

  const addName = (event) => {
    event.preventDefault()
 
    if (persons.find(person => 
      person.name.toLowerCase() === newName.toLowerCase()) !== undefined) 
    {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat( {name: newName, number: newNumber, id: persons.length+1 } ))
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm onNameChange={handleNameChange} 
                  onNumberChange={handleNumberChange} 
                  onAddName={addName} 
                  newName={newName}
                  newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  )
}

export default App