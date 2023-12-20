const RoleController = require('../Controllers/role.controller')
const express = require('express')
const RoleRoute = express.Router()

RoleRoute.post('/api/role', RoleController.createRole);

module.exports = RoleRoute
