const Lista = ({arr, func}) => {
  return (
    <>
    <ul> 
      {arr.map(person => <ItemLista person={person} func={func} key={person.id}/>)}
    </ul>
    </>
  )
}

const ItemLista = ({person, func}) => {
  const str = "Are you sure you want to delete this person"
  return(
    <>
      <li> {person.name}: {person.number} {'\u00A0'}
        <button onClick={() => {if (window.confirm(str)) {func(person.name)}}}>Delete</button> 
      </li> 
    </>
  )
}

export default Lista