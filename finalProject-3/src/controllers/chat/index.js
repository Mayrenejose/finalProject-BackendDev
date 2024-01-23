import { ChatService }  from "../../service/index.js"

export const getAllUsers = async(req, res) => {
    try {
        const allUsers = await ChatService.getAllUsers()
        
        res.status(200).json({data: allUsers})
    } catch (error) {
        res.status(500).send({message: 'server error'})
    }
}

export const getUser = async(req, res) => {
    try {
        const email = req.params.email
        const userEmail = await ChatService.getUser(email)

        if ( userEmail === null ) {
            res.status(404).json({message: 'Unregistered user'})            
        } else {
            res.status(200).json({data: userEmail})
        }
    } catch (error) {
        res.status(500).send({message: 'server error'})
    }
}

export const getMessage = async(req, res) => {
    try {
        const idUser = req.params.id
        const messageHistory = await ChatService.getMessage(idUser) 
        
        res.status(200).json({data: messageHistory})
    } catch (error) {
        console.error('error getting history:', error);
        res.status(500).send({message: 'server error'})
    }
}

export const addUser = async(req, res) => {
    try {
        const bodyUser = req.body
        const newUser = await ChatService.addUser(bodyUser)
        res.status(200).json({data: newUser})
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send({message: 'server error'})
    }
}

export const addMessage = async(req, res) => {
    try {
        const idUser = req.params.id
        const bodyMessage = req.body.message
        const userEmail = await ChatService.addMessage(idUser, bodyMessage)
        return res.status(200).json(userEmail)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'server error'})
    }
}