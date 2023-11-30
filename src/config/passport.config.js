import passport from "passport";
import LocalStrategy from "passport-local"
import GitHubStrategy from "passport-github2"
import { createHash, isValidPassword } from '../utils.js'
import { config } from "./config.js";
import { UsersService } from "../service/users.service.js";



export const initializePassport = () =>{
    passport.serializeUser((user, done) =>{
        done(null, user._id);
    });


    passport.deserializeUser(async (id, done) =>{
        try {
            let user = await UsersService.getUserById(id)
            done(null, user);
        }
        catch (error) {
            console.log(error.message)
            done(error)
        }
    });



    passport.use("githubStrategy", new GitHubStrategy({
            clientID: config.github.clientID,
            clientSecret: config.github.clientSecret,
            callbackUrl: config.github.callbackUrl
        },
        async(accessToken, refreshToken, profile, done) =>{
            try {
                if (profile._json.email === null) {
                    console.log("The user has not added email to their GitHub");
                }
                let user = await UsersService.getUserByEmail({email:profile._json.email});
                if(!user){
                    const newUser ={
                        first_name: profile._json.name,
                        email: profile._json.email,
                        password: "",
                        profile: profile._json.avatar_url
                    };
                    let userCreated = await UsersService.createUser(newUser);
                    return done(null, userCreated);
                }
                else{
                    done(null, user);
                }
            }
            catch (error) {
                console.log(error.message);
                done(error);
            }
        }
    ))



    passport.use("registerStrategy", new LocalStrategy({
            usernameField:"email",
            passReqToCallback:true
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
                    role: role,
                    profile: req.file.filename
                }
                let userCreated = await UsersService.createUser(newUser)
                return done(null, userCreated)
            }
            catch (error) {
                console.log("Error in registerStrategy",error.message)
                done(error)
            }
        }
    ))



    passport.use("loginStrategy", new LocalStrategy({
            usernameField:"email"
        },
        async(username, password, done) =>{
            try {
                const user = await UsersService.getUserByEmail(username)
                if(!user){
                    console.log("User does not exist")
                    return done(null, false)
                }

                if(!isValidPassword(user, password)){
                    return done(null, false)
                }
                else{
                    user.last_connection = new Date()
                    await UsersService.updateUser(user._id, user)
                    return done(null, user)
                }
            }
            catch (error) {
                console.log(error.message)
                done(error)
            }
        }
    ))
};