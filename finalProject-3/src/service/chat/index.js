import { io } from '../../app.js'

export default class ChatService {
    constructor(dao) {
        this.dao = dao
    }

    getAllUsers = async() => {return this.dao.getAllUsers()}

    getUser = async email => {return this.dao.getUser(email)}        

    getMessage = async idUser => {return this.dao.getMessage(idUser)}

    addUser = async bodyUser => {return this.dao.addUser(bodyUser)}

    addMessage = async (idUser, bodyMessage) => {
        try {
            const userEmail = await this.getMessage(idUser)
            
            if (userEmail) {
                userEmail.message.push(bodyMessage)

                const messageNew = await userEmail.save()
                io.emit('chat_ecommerce', messageNew)
                return messageNew
            } else {
                throw new Error('User not found')
            }
        } catch (error) {
            console.error('Error in addMessage:', error);
            throw error
        }
    }
}