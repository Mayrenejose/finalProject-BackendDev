import { UserService } from "../../service/index.js"
import { createHash } from '../../utils/validationHash/index.js'
import  UserInsertDTO  from '../../dto/user/index.js'

export const getCurrent = async (req, res) => {
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
}

export const getUsers = async(req, res) => {
    try {
        const allUsers = await UserService.getUsers()
        
        res.status(200).json({data: allUsers})
    } catch(error) { 
        res.status(500).send('Error server')
    }
}

export const addRegister =  async(req, res) => {
    try {         
        const body = req.body 
        body.password = createHash(body.password)        
        const result = await UserService.addRegister(body)
        
        if (!result) return res.status(400).send('Error registering user')
        
        return res.redirect('/login')
    } catch(error) {        
        res.status(500).send(`Error registering user: ${error.message}`)
    }
}

export const addLogin = async (req, res) => {
    console.log(req,44);
    if (!req.user) return res.status(400).send('Invalid Credentiasls')

    req.session.user = req.user
    return res.redirect('/products')
}

export const loginGithub = function(req, res) {
    if (!req.user) {
        console.error('Authentication failed.')
        return res.redirect('/')
    }
    return res.redirect('/products')
}

export const logout = (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send('error')

        return res.redirect('/')
    })
}