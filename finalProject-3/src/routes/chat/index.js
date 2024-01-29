import { Router } from 'express'
import {
    getAllUsers,
    getUser,
    getMessage,
    addUser,
    addMessage
} from '../../controllers/chat/index.js'
import passport from 'passport'
import authorizationSystem  from '../../middleware/authorizationSystem/index.js'

const router = Router()

router.get('/users', getAllUsers)
router.get('/users/:email', passport.authenticate('jwt', {session: false}), getUser)
router.get('/user/:id', passport.authenticate('jwt', {session: false}), getMessage)
router.post('/', passport.authenticate('jwt', {session: false}), addUser)
router.post('/:id',passport.authenticate('jwt', {session: false}), authorizationSystem('user'), addMessage)

export default router