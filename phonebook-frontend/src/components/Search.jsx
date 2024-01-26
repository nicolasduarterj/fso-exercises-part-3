import { useState } from "react"
const Search = ({arr}) => {
  const [filtro, setFiltro] = useState("")
  const [filtrados, setFiltrados] = useState([])
  function changeFiltro(event) {
    setFiltro(event.target.value)
    const valid = arr.filter(person => person.name.includes(event.target.value))
    console.log("valid: ", valid)
    setFiltrados(valid)
  }

  return (
    <>
      <h3>Search for a person</h3>
      <input value={filtro} onChange={changeFiltro}/>
      <ul>
        {filtrados.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
      <br/>

    </>
  )
}

export default Search