const User = require('../Models/user.model')

class UserQueries  {
    async findByEmail(email) {
        return User.findOne({email})
    }

    async createUser(data) {
        return new User(data).save()
    }

    async updateUser(data) {
        const {filter,updateObj} = data
        return User.updateOne(filter,updateObj)
    }

    async deleteUser(userId) {
        return User.deleteOne({_id:userId})
    }

}

module.exports = new UserQueries()
