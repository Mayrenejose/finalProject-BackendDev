import { Router } from 'express'
import {
    getCurrent,
    getUsers,
    addRegister,
    addLogin,
    loginGithub,
    logout
} from '../../controllers/user/index.js'
import passport from 'passport'

const router = Router()

router.get('/current', getCurrent)
router.get('/users', getUsers) 
router.post('/register', addRegister) 
router.post('/login', passport.authenticate('login', { failureRedirect: '/' }), addLogin) 
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }))
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), loginGithub)
router.get('/logout', logout)

export default router