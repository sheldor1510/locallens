const mongoose = require('mongoose')

const ResponseSchema = new mongoose.Schema({
    gigID: {
        type: String,
        required: true
    },
    applicant: { // local's sid
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        required: false,
        default: false
    }
})

const Response = mongoose.model('Response', ResponseSchema)

module.exports = Response