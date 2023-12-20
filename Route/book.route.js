const BookController = require('../Controllers/book.controller')
const express = require('express')
const BookRoute = express.Router()

BookRoute.post('/api/books', BookController.createBook);
BookRoute.get('/api/books', BookController.searchBook);
BookRoute.get('/api/books/:id', BookController.searchBook);
BookRoute.put('/api/books/:id', BookController.updateBook);
BookRoute.delete('/api/books/:id', BookController.deleteBook)

module.exports = BookRoute
