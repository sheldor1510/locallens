const mongoose = require('mongoose')

const GigSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    lookingForText: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    postedBy: { // user's sid
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    },
    localAssigned: { // local's sid
        type: String,
        required: false
    },
    conversationId: {
        type: String,
        required: false
    }
})

const Gig = mongoose.model('Gig', GigSchema)

module.exports = Gig