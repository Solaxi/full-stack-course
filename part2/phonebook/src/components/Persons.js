const Persons = ({persons}) => {
    return (
        <>
        {persons.map(person => <Person key={person.id} person={person} />)}
        </>
    )
}

const Person = ({person}) => <>{person.name} {person.number}<br/></>

export default Persons