const mongoose = require('mongoose')
const {Schema} = mongoose

const BookSchema = new Schema({
    id : String,
    login_id: String,
    title : String,
    author : String,
    publishedDate : String,
    genre : String,
    price: String
})


module.exports = mongoose.model('Book', BookSchema, 'Book');
