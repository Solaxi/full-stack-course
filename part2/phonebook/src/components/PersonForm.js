const PersonForm = (props) => {
    return (
        <form onSubmit={props.onAddPerson}>
        <table><tbody>
        <tr><td>Name:</td><td><input value={props.newName} onChange={props.onNameChange} /></td></tr>
        <tr><td>Phone:</td><td><input value={props.newNumber} onChange={props.onNumberChange} /></td></tr>
        <tr><td></td><td><button type="submit">Add</button></td></tr>
        </tbody></table>
        </form>
    )
}

export default PersonForm