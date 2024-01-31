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



app.get('/info', async (req, res) => {
  const persons = await Person.find({})
  const data = new Date().toString()
  const pageRes = `<p>Phonebook has info for ${persons.length} people</p><p>${data}</p>`
  res.send(pageRes) 
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(response => {
      res.json(response)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id).then(pers => {
    if (pers !== null) {
      console.log(pers)
      const validos = pers
      res.json(validos) 
    }
    else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findByIdAndDelete(id) 
  res.status(204).end()
})

app.post('/api/persons', (req, res, next) => {
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
      .catch(error => next(error))
    res.json(person)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  const body = req.body

  const newpers = {
    name: body.name,
    number: body.number
  }
  
  try {
    const updatedPers = await Person.findByIdAndUpdate(req.params.id, newpers, {new: true})
    res.json(updatedPers)
  }
  catch(error) {
    next(error)
  }
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'Unknown endpoint!'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}


app.use(errorHandler)
app.listen(3001, () =>  {
  console.log('Server is running on port 3001')
})