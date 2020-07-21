/**
 * Create User model for storing in the Mongodatabase
 * Defining a moongose document Structure
 */

const moongose = require('moongose')
const UserSchema = new moongose.schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})