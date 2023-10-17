import passport from "passport";
import local from "passport-local"
import { createHash, isValidPassword } from '../utils.js'
import GitHubStrategy from "passport-github2"
import { config } from "./config.js";
import { UsersService } from "../service/users.service.js";


const LocalStrategy = local.Strategy


export const initializePassport = () =>{

    passport.serializeUser((user, done) =>{
        done(null, user._id)
    })


    passport.deserializeUser(async (id, done) =>{
        let user = await UsersService.getUserById(id)
        done(null, user)
    })



    passport.use("githubStrategy", new GitHubStrategy(
        {
            clientID: config.github.clientId || "Iv1.4fcd41fa39808e5d",
            clienteSecret: config.github.clienteSecret,
            callbackUrl: config.github.callBackUrl || "http://localhost:8080/api/sessions/githubcallback"
        },
        async(accessToken, refreshToken, profile, done) =>{
            try {
                console.log(profile)

                let user = await UsersService.getUserByEmail({email:profile._json.email})
                if(!user){
                    const newUser ={
                        first_name: profile._json.name,
                        email: profile._json.email,
                        password: ""
                    }
                    let userCreated = await UsersService.createUser(newUser)
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
                const user = await UsersService.getUserByEmail(username)
                if(user){
                    return done(null, false)
                }

                let role = "user"

                if(username.endsWith("@coder.com")){
                    role = "admin"
                }

                const newUser ={
                    first_name: first_name,
                    email: username,
                    password: createHash(password),
                    role: role
                }

                let userCreated = await UsersService.createUser(newUser)
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
                const user = await UsersService.getUserByEmail(username)
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