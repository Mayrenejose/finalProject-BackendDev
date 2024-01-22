import { io } from '../../app.js'

export default class ChatService {
    constructor(dao) {
        this.dao = dao
    }

    getAllUsers = async() => {return this.dao.getAllUsers()}

    getUser = async email => {return this.dao.getUser(email)}        

    getMessage = async idUser => {return this.dao.getMessage(idUser)}

    addUser = async bodyUser => {return this.dao.addUser(bodyUser)}

    addMessage = async(idUser,bodyMessage) => {
        const userEmail = await this.dao.getMessage(idUser)
        userEmail.message.push(bodyMessage)

        const messageNew = await this.dao.addMessage(userEmail)
        io.emit('chat_ecommerce' , messageNew)
    }
}