const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log("connecting to ", url)

mongoose.connect(url).then(result => {
    console.log("Connected to mongodb")
}).catch(error => {
    console.log("Error connecting to mongodb ", error)
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 9, //Assuming the exercise meant 8 digits, not including the dash
        required: true,
        validate: {
            validator: function(v) {
                return /^(\d{2}|\d{3})-\d+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number`
        }

    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)