import { Router } from 'express'
import { io } from '../../app.js' 
import messageModel from '../../dao/models/messages.models.js'

const router = Router()

router.post('/', async(req, res) => {
    try {
        const bodyUser = req.body
        const newUser = await messageModel.create(bodyUser)
        io.emit('chat_ecommerce' ,  newUser)
        res.status(200).json({data: newUser})
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send({message: 'server error'})
    }
})

router.post('/:id', async(req, res) => {
    try {
        const idUser = req.params.id
        const bodyMessage = req.body.message

        const userEmail = await messageModel.findById(idUser)
        userEmail.message.push(bodyMessage)

        const messageNew = await userEmail.save()
        io.emit('chat_ecommerce' ,  messageNew)
        return res.status(200).json( messageNew )

    } catch (error) {
        console.error('messages get failed')
        res.status(500).send({message: 'server error'})
    }
})

export default router