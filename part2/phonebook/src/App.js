import { useState, useEffect } from 'react'
import phonebookService from './services/phonebookService'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import './index.css'

const App = () => {
  useEffect(() => { 
    phonebookService
    .getAll()
    .then(allPersons => {
      setPersons(allPersons)
    })
  },[])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const shownPersons = filter === "" ? persons : persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)

  /*
  Create new PhoneBook contact
  */
  const addPerson = (event) => {
    event.preventDefault()
 
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (existingPerson !== undefined) 
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        changePerson(existingPerson)
      }
      return        
    }

    //If no existing person was found, add a new one
    const newPerson = {name: newName, number: newNumber }
    phonebookService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))

        setSuccessMessage(`Added ${createdPerson.name}`)
        setMessageTimeout()
      })
    setNewName("")
    setNewNumber("")
  }

  const setMessageTimeout = () => {
    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 5000)
  }

  /*
  Update person with new phonenumber
  */
  const changePerson = (existingPerson) => {
    const changedPerson = {...existingPerson, number: newNumber}
    console.log("updating ", changedPerson);
    phonebookService
      .update(changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
      })
      .catch(error => {
        setErrorMessage(`Information of ${existingPerson.name} has already been removed from server`)
        setMessageTimeout()
      })
  }

  /*
  Remove person from server
  */
  const removePerson = (event) => {
    const id = parseInt(event.target.value)
    const personToRemove = persons.find(person => person.id === id)
    console.log(`removing ${id}, ${personToRemove.name}`);
    if (!window.confirm(`Delete ${personToRemove.name}?`)) {
      return
    }

    phonebookService
      .remove(id)
      .then(statusOk => {
        console.log(`removed ${id}: `, statusOk);
        if (statusOk) setPersons(persons.filter(person => person.id !== id))
      })
  }

  //Handle input field changes
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style="error" />
      <Notification message={successMessage} style="success" />
      <Filter onChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm onNameChange={handleNameChange} 
                  onNumberChange={handleNumberChange} 
                  onAddPerson={addPerson} 
                  newName={newName}
                  newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} removePerson={removePerson} />
    </div>
  )
}

export default App