const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    userId : String,
    username : String,
    mobile : String,
    email : String,
    password : String,
    role : String
})

module.exports = mongoose.model('User', UserSchema, 'User');
