const mongoose = require('mongoose')

if (process.argv.length < 3 ) {
    console.log("Please provide a password")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dbaUser:${password}@phonebookdb.kgh4ruz.mongodb.net/?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url).then(() =>  {
    console.log("Connected")
    
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    newPerson.save().then(result => {
        console.log('Person saved')
        mongoose.connection.close()
    })
}
else if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(note => console.log(note))
        mongoose.connection.close()
    })
}
