require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body' , function (req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: function (req, res) {return req.method !== "POST"}
}))



app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const data = new Date().toString()
    const pageRes = `<p>Phonebook has info for ${persons.length} people</p><p>${data}</p>`
    res.send(pageRes) 
  })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(response => {
      res.json(response)
    })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  let validos = []
  Person.findById(id).then(response => {
    validos = response
    res.json(validos)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findByIdAndDelete(id) 
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    res.statusMessage = 'missing values OR that person already exists on the database'
    res.status(400).end()
  }
  else {
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save().then(console.log("Person saved"))
    res.json(person)
  }
})

app.listen(3001, () =>  {
  console.log('Server is running on port 3001')
})