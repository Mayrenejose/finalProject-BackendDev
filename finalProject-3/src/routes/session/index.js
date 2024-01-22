import { Router } from 'express'
import usersModel from '../../dao/models/user.models.js'
import { createHash } from '../../utils/validationHash/index.js'
import passport from 'passport'
import  UserInsertDTO  from '../../dto/user/index.js'

const router = Router()

router.get('/current', async (req, res) => {
    try {
        let userData

        if (req.isAuthenticated()) {
            userData = new UserInsertDTO(req.user)
        } else if (req.session.user) {
            userData = new UserInsertDTO(req.session.user)
        } else {
            return res.status(401).json({ error: 'User not authenticated' })
        }
        res.status(200).json({ data: userData })
    } catch (error) {
        res.status(500).send('Error server')
    }
})

router.get('/users', async(req, res) => {
    try {
        const allUsers = await usersModel.find().lean().exec()
        
        res.status(200).json({data: allUsers})
    } catch(error) { 
        res.status(500).send('Error server')
    }
})

router.post('/register', async(req, res) => {
    try {         
        const body = req.body 
        body.password = createHash(body.password)        
        const result = await usersModel.create(body)
        
        if (!result) return res.status(400).send('Error registering user')
        
        return res.redirect('/login')
    } catch(error) {        
        res.status(500).send(`Error registering user: ${error.message}`)
    }
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/' }),
    async (req, res) => {
        if (!req.user) return res.status(400).send('Invalid Credentiasls')

        req.session.user = req.user
        return res.redirect('/products')
    }
)

router.get('/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }))

router.get('/github/callback',
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
    if (!req.user) {
        console.error('Authentication failed.')
        return res.redirect('/')
    }
    return res.redirect('/products')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send('error')

        return res.redirect('/')
    })
})


export default router