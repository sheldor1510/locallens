const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    sid: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false,
        default: ''
    },
    duration: {
        type: String,
        required: false,
        default: ''
    },
    bio: {
        type: String,
        required: false,
        default: ''
    },
    tags: {
        type: Array,
        required: false,
        default: []
    },
    gigsCompleted: {
        type: Number,
        required: false,
        default: 0
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User