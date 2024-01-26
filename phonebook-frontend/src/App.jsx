import { useEffect, useState } from 'react'
import bookServices from './services/bookServices'
import './index.css'
import { Search, FormPhB, Lista, Notification} from './components/index.js'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("") 
  const [newNum, setNewNum] = useState("")
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const addName = event => {
    const num = persons.length + 1
    event.preventDefault()
    let notaObj = {
      name: newName,
      number: newNum,
      id: num.toString()
    }
    console.log("NotaObj antes do if: ", notaObj)
    
    //Se não há um objeto na array tal que o seu nome seja igual ao nome na notaObj
    if (!persons.some(person => person.name === notaObj.name)) { 
        bookServices.postPerson(notaObj).then(retorno => {
          setPersons(persons.concat(retorno))
          console.log("Persons concateneda: ", persons.concat(retorno))
          setNewName("")
          showSucc(`Added ${notaObj.name} to the phonebook`)
        }
        ).catch(error => {
          showError("Something went wrong")
        })
      
    }

    else {
      if (window.confirm("This person is already present on the phonebook. Do you wish to alter their information nonetheless?")) {
        notaObj.id = persons.find(person => person.name === notaObj.name).id
        console.log("NotaObj.id =", notaObj.id)
        bookServices.updatePerson(notaObj).then(retorno => {
          setPersons(persons.filter(person => person.name !== notaObj.name).concat(retorno))
          console.log("Persons concatenada: ", persons.concat(retorno))
          setNewName("")
          showSucc(`Updated ${notaObj.name}'s information`)
        }).catch(error => {
          showError("Something went wrong")
        })
      }
    }
  }

  const showError = errMess => {
    setIsError(true)
    setMessage(errMess)
    setTimeout(() => setMessage(null), 5000)
  }
  
  const showSucc = succMess => {
    setIsError(false)
    setMessage(succMess)
    setTimeout(() => setMessage(null), 5000)
  }

  const noteChange = event => {
    setNewName(event.target.value)
  }

  const numChange = event => {
    setNewNum(event.target.value)
  }

  const deletePerson = name => {
    const id = persons.find(person => person.name === name).id
    bookServices.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
      showSucc(`${name} was deleted from the phonebook`)
    }).catch(error => {
      showError(`${name} was already deleted from the phonebook`)
      setPersons(persons.filter(person => person.id !== id))
    })
  }
  
  useEffect(() => {
    console.log("Starting effect")
    bookServices.getAll().then(resposta => {
      console.log("Effect conluded")
      setPersons(resposta)}) 
  }, [])
  
  return (
    <div> 
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>
      <Search arr={persons}/>
      <h3>Add someone to the phonebook</h3>
      <FormPhB states={[newName, newNum]} funcs={[addName, noteChange, numChange]}/>
      <h2>All numbers</h2>
      <Lista arr={persons} func={deletePerson}/>
    </div>
  )
}

export default App