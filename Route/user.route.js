const UserController = require('../Controllers/user.controller')
const express = require('express')
const UserRoute = express.Router()

UserRoute.post('/api/users/register', UserController.createUser)
UserRoute.put('/api/update/users/register/:id', UserController.updateUser)
UserRoute.delete('/api/delete/users/register/:id', UserController.deleteUser)

module.exports = UserRoute
