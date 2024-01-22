import messageModel from '../../models/messages.models.js'

export default class ChatManager {

    getAllUsers = async() => {return await messageModel.find().lean().exec()}

    getUser = async email => {return await messageModel.findOne({email: email})}

    getMessage = async idUser => {return await messageModel.findById(idUser)}

    addUser = async bodyUser => {return await messageModel.create(bodyUser)}

    addMessage = async userEmail => {return await messageModel.save(userEmail)}
}
