import { Router } from 'express'
import { io } from '../../app.js' 
import messageModel from '../../dao/models/messages.models.js'

const router = Router()

router.get('/users', async(req, res) => {
    try {
        const allUsers = await messageModel.find().lean().exec()
        
        res.status(200).json({data: allUsers})
    } catch (error) {
        res.status(500).send({message: 'server error'})
    }
})

router.get('/users/:email', async(req, res) => {
    try {
        const email = req.params.email
        const userEmail = await messageModel.findOne({email: email})

        if ( userEmail === null ) {
            res.status(404).json({message: 'Unregistered user'})            
        } else {
            res.status(200).json({data: userEmail})
        }

    } catch (error) {
        res.status(500).send({message: 'server error'})
    }
})



router.get('/user/:id', async(req, res) => {
    try {
        const idUser = req.params.id
        const messageHistory = await messageModel.findById(idUser) 
        
        res.status(200).json({data: messageHistory})
    } catch (error) {
        console.error('error getting history:', error);
        res.status(500).send({message: 'server error'})
    }
})

router.post('/', async(req, res) => {
    try {
        const bodyUser = req.body
        const newUser = await messageModel.create(bodyUser)
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
        io.emit('chat_ecommerce' , messageNew)
        return res.status(200).json( messageNew )

    } catch (error) {
        console.error('messages get failed')
        res.status(500).send({message: 'server error'})
    }
})

export default router