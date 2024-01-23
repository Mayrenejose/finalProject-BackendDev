import { Router } from 'express'
import {
    getAllUsers,
    getUser,
    getMessage,
    addUser,
    addMessage
} from '../../controllers/chat/index.js'

const router = Router()

router.get('/users', getAllUsers)
router.get('/users/:email', getUser)
router.get('/user/:id', getMessage)
router.post('/', addUser)
router.post('/:id', addMessage)

export default router