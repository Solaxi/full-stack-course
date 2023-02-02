const Persons = ({persons, removePerson}) => {
    return (
        <>
        {persons.map(person => <><Person key={person.id} person={person} removePerson={removePerson} /></>)}
        </>
    )
}

const Person = ({ person, removePerson }) => <>{person.name} {person.number} <button onClick={removePerson} value={person.id}>Delete</button><br/></>

export default Persons