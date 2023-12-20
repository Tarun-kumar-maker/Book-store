const Book = require('../Models/book.model')
const UserRole = require('../Models/role.model')
const UUID = require('uuid')
const utils = require('../Utils/response')
const {STATUS_CODE} = require('../Helpers/StatusCode')
const CONSTANT = require('../Helpers/Constant')

exports.createBook = async (req,res) => {
  try {    
  const {body} = req
  const {title, login_id, author, publishedDate, genre, price} = body

  const userData = {
    id : UUID.v4(),
    title, login_id, author, publishedDate, genre, price }

  if (login_id) {
    let UserInfo = await User.findOne({userId: login_id});
    let user_role_id = UserInfo.role_id;
    let UserRole = await UserRole.findOne({role_id: user_role_id})
    if (UserRole.roleMacName != '_admin') {
      return res.status(200).send({'message':'This User not able to access',"status" : "200"});
    }
  }

    let alreadyCreated = await Book.findOne({id: userData.id});
    if (alreadyCreated){
      return res.status(200).send({'message':'Book already exists Only you can update this',"status" : "200"});
    }
    const book_data = await Book(userData).save();
    return res.status(200).send({'message':'Book Saved Sucessfully','data': book_data,"status" : "200"});
  }
  catch(error) {
    console.log('error in createBook controller', error)
    return utils.sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG)
  }
 }

exports.searchBook = async (req,res) => {
  try {
    const book_id = req.params.id;
    const searchData = {};
    if (book_id) {
      searchData.id = book_id;
    }
    let book_data = await Book.findOne({id: book_id});
    return res.status(200).send({'message': 'Book Data', 'data': book_data, "status": "200"})
  }
  catch(error) {
    console.log('error in searchBook controller', error)
    return utils.sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG)
  }
}

exports.updateBook = async (req,res) => {
  try {
    const book_id = req.params.id;
    const body = req.body;
    let updateObj = await Book.findOne({id: book_id});
    const login_id = updateObj.login_id;
    if (login_id) {
      let UserInfo = await User.findOne({userId: login_id});
      let user_role_id = UserInfo.role_id;
      let UserRole = await UserRole.findOne({role_id: user_role_id})
      if (UserRole.roleMacName != '_admin') {
        return res.status(200).send({'message':'This User not able to access',"status" : "200"});
      }
    }
    updateObj.title = body?.title
    updateObj.login_id = body?.login_id
    updateObj.author = body?.author
    updateObj.publishedDate = body?.publishedDate
    updateObj.genre = body?.genre
    updateObj.price = body?.price
    const updatedBook = await Book(updateObj).save();
    return utils.sendResponse(res, STATUS_CODE.OK, CONSTANT.Response.USER_UPDATE, updatedBook)
  }
  catch(error) {
    console.log('error in updateBook controller', error)
    return utils.sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG)
  }
}

exports.deleteBook = async (req,res) => {
  try {
    const book_id = req.params.id;
    if (book_id) {
      let book_data = await Book.deleteOne({id: book_id});
      const login_id = book_data.login_id;
      if (login_id) {
        let UserInfo = await User.findOne({userId: login_id});
        let user_role_id = UserInfo.role_id;
        let UserRole = await UserRole.findOne({role_id: user_role_id})
        if (UserRole.roleMacName != '_admin') {
          return res.status(200).send({'message':'This User not able to access',"status" : "200"});
        }
      }
      return res.status(200).send({'message':'Delete Successfully','data': book_data,"status":"200"})
    }
    return res.status(200).send({'message':'Id mandatory for deleting movie'})
  }
  catch(error) {
    console.log('error in deleteBook controller', error)
    return utils.sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG)
  }
}
