import passport from "passport"
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import UserModel from '../models/user.models.js'
import { createHash, isValidPassword } from '../utils/validationHash/index.js'

const LocalStrategy = local.Strategy

const initialize = () => {

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.d5e53923309a4a62',
        clientSecret: '60ec544097798ed45ba56de2e58cd250dbfbaaeb',
        callbackURL: 'http://localhost:8080/session/github/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserModel.findOne({ email: profile._json.email })
            if(user) {
                return done(null, user)
            }

            const newUser = await UserModel.create({
                first_name: profile._json.name, 
                last_name: '',
                email: profile._json.email,
                password: '',
                age: 0
            })

            return done(null, newUser)

        } catch (error) {
            return done('Error to login with github ' + error)
        }
    }))    

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { 
            email, 
            first_name,
            last_name, 
            age
        } = req.body 
        
        try {
        const user = await UserModel.findOne({ email: username })

        if(user) {
            return done(null, false, { message: 'user ready' })
        }

        const newUser = await UserModel.create({
            first_name,
            email,
            last_name,
            age,
            password: createHash(password)
        })

        const userNew = await UserModel.create(newUser)
        done(null, userNew)

        } catch(error) {
            done(error)
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username}).lean().exec()
            if(!user) {   
                console.error('user invalid')             
                return done(null, false)
            }
            
            if(!isValidPassword(user, password)) {
                console.error('password invalid')
                return done(null, false)
            }
            return done(null, user)

        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initialize