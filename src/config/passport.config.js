import passport from "passport";
import local from "passport-local"
import { usersService } from '../dao/servicesMongo.js'
import { createHash, isValidPassword } from '../utils.js'
import GitHubStrategy from "passport-github2"
import { config } from "./config.js";


const LocalStrategy = local.Strategy


export const initializePassport = () =>{

    passport.serializeUser((user, done) =>{
        done(null, user._id)
    })


    passport.deserializeUser(async (id, done) =>{
        let user = await usersService.getUserById(id)
        done(null, user)
    })



    passport.use("githubStrategy", new GitHubStrategy(
        {
            clientID: config.github.clientID,
            clienteSecret: config.github.clienteSecret,
            callbackUrl: config.github.callbackUrl
        },
        async(accessToken, refreshToken, profile, done) =>{
            try {
                console.log(profile)

                let user = await usersService.getUserByEmail({email:profile._json.email})
                if(!user){
                    const newUser ={
                        first_name: profile._json.name,
                        email: profile._json.email,
                        password: ""
                    }
                    let userCreated = await usersService.createUser(newUser)
                    return done(null, userCreated)  
                }
                else{
                    done(null, user)
                }
            }
            catch (error) {
                return done(error)             
            }
        }
    ))



    passport.use("registerStrategy", new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField:"email"
        },
        async(req, username, password, done) =>{
            try {
                const { first_name } = req.body
                const user = await usersService.getUserByEmail(username)
                if(user){
                    return done(null, false)
                }

                const newUser ={
                    first_name: first_name,
                    email: username,
                    password: createHash(password)
                }
                let userCreated = await usersService.createUser(newUser)
                return done(null, userCreated)
            }
            catch (error) {
                return done(error)
            }
        }
    ))



    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField:"email"
        },
        async(username, password, done) =>{
            try {
                const user = await usersService.getUserByEmail(username)
                if(!user){
                    done(null, false)
                }

                if(isValidPassword(user, password)){
                    return done(null, user)
                }
                else{
                    return done(null, false)
                }
            }
            catch (error) {
                return done(error)
            }
        }
    ))
}