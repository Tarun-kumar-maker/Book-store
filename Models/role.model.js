const mongoose = require('mongoose')
const {Schema} = mongoose

const RoleSchema = new Schema({
    roleId : String,
    roleMacName : String,
    roleName : String
})

module.exports = mongoose.model('Role', RoleSchema, 'Role');
