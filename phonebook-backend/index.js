const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body' , function (req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: function (req, res) {return req.method !== "POST"}
}))

persons = [
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

app.get('/info', (req, res) => {
  const data = new Date().toString()
  const pageRes = `<p>Phonebook has info for ${persons.length} people</p><p>${data}</p>`
  res.send(pageRes) 
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const entry = persons.find(person => person.id === id)
  if(entry) {
    res.json(entry)
  } 
  else {
    res.statusMessage = "NOT FOUND: no note with requested id"
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number || persons.find(person => person.name === body.name)) {
    res.statusMessage = 'missing values OR that person already exists on the database'
    res.status(400).end()
  }
  else {
    const ran = genRan1000()
    const person = {
      id: ran,
      name: body.name,
      number: body.number
    }
    persons = persons.concat(person)
    console.log(persons)
    res.json(person)
  }
})

function genRan1000() {
  return Math.floor(Math.random() * 1000)
}

app.listen(3001, () =>  {
  console.log('Server is running on port 3001')
})