const UserQueries = require('../Queries/User.Queries')
const UUID = require('uuid')
const utils = require('../Utils/response')
const {STATUS_CODE} = require('../Helpers/StatusCode')
const CONSTANT = require('../Helpers/Constant')
const User = require('../Models/user.model');

exports.createUser = async (req,res) => {
    try {

        const {body} = req
        const {username, mobile, email, password, role_id} = body
        let alreadyUser = await UserQueries.findByEmail(email)
        if(alreadyUser) {
            return utils.sendResponse(res,STATUS_CODE.OK,CONSTANT.USER_ALREADY_EXISTS,alreadyUser)
        }
        const userData = {
            userId : UUID.v4(),
            username, mobile, email, password, role_id
        }
        const user = await UserQueries.createUser(userData)
        return res.status(200).send({'message':'User Saved Sucessfully', 'data': user, "status" : "200"});

    }catch(error) {
        
        console.log('error in createUser controller',error)
        return utils.sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG)
    }
}

exports.updateUser = async(req,res) => {
    try {
        const {body} = req
        const Id = req.params.id
        let updateObj = await User.findOne({userId: Id});
        updateObj.username = body.username ?? UserObj.username
        updateObj.mobile = body.mobile ?? UserObj.mobile
        updateObj.email = body.email ?? UserObj.email
        updateObj.password = body.password ?? UserObj.password
        updateObj.role_id =  body.role_id ?? UserObj.role_id
        update_user = await User(updateObj).save();
        return res.status(200).send({'message':'User Update Sucessfully', 'data': update_user , "status" : "200"});
    }catch(error) {
        console.log('error in updateUser',error)
        return utils.sendResponse(res,STATUS_CODE.INTERNAL_SERVER_ERROR,CONSTANT.SOMETHING_WENT_WRONG)
    }
}

exports.deleteUser = async(req,res) => {
    try {
        const Id = req.params.id
        let delete_user = await User.deleteOne({id: Id});
        return utils.sendResponse(res,STATUS_CODE.OK,CONSTANT.Response.USER_UPDATE,delete_user)
    }catch(error) {
        console.log('error in deleteUser',error)
        return utils.sendResponse(res,STATUS_CODE.INTERNAL_SERVER_ERROR,CONSTANT.SOMETHING_WENT_WRONG)
    }
}

