const UUID = require('uuid')
const utils = require('../Utils/response')
const {STATUS_CODE} = require('../Helpers/StatusCode')
const CONSTANT = require('../Helpers/Constant')
const user_role = require('../Models/role.model');

exports.createRole = async (req,res) => {
    try {
        const {body} = req
        const {roleMacName, roleName} = body
        const roleData = {
            roleId : UUID.v4(),
            roleMacName, roleName
        }
        const role_data = await user_role(roleData).save();
        return res.status(200).send({'message':'Role Saved Sucessfully', 'data': role_data, "status" : "200"});
    }catch(error) {
        console.log('error in createRole controller',error)
        return utils.sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG)
    }
}
