import mongoose from "mongoose";
import { UsersMongo } from '../src/dao/managers/mongo/usersMongo.js';
import { usersModel } from "../src/dao/models/users.model.js";
import chai from "chai";


const expect = chai.expect;
const testDB = "mongodb+srv://Facundo:Metalero120@cluster0.lxndxty.mongodb.net/testDB?retryWrites=true&w=majority";


await mongoose.connect(testDB);
console.log("DataBase test connected");

describe("Tests for user managers (DAO users mongo)", function(){

    before(async function(){
        this.usersManager = new UsersMongo()
    });

    beforeEach(async function(){
        usersModel.deleteMany({})
    });



    it("The createUser method must create a user and save it in the database", async function(){
        const mockUser = {
            first_name: "Roberto",
            last_name: "Perez",
            email: "roberto@gmail.com",
            age: 30,
            password: "RobertoRoberto30",
        }
        const response = this.usersManager.createUser(mockUser);
        expect(Number(response._id)).to.be.ok
    });



    it("The getUserByEmail method must return an array of the user found by the email", async function(){
        const mockUser = {
            first_name: "Roberto",
            last_name: "Perez",
            email: "roberto@gmail.com",
            age: 30,
            password: "RobertoRoberto30",
        }
        const response = this.usersManager.createUser(mockUser);
        const userEmail = response.email
        const responseUser = await this.usersManager.getUserByEmail(userEmail)
    
        expect(responseUser.email).to.be.equal("roberto@gmail.com")
    });



    it("The getUserById method should return an array of the user found with that ID", async function(){
        const mockUser = {
            first_name: "Roberto",
            last_name: "Perez",
            email: "roberto@gmail.com",
            age: 30,
            password: "RobertoRoberto30",
        }
        const response = this.usersManager.createUser(mockUser);
        const userid = response._id
        const responseUser = await this.usersManager.getUserById(userid)
    
        expect(responseUser._id).to.be.equal(response._id)
    });



    it("The updateUser method must update the data of a user saved in the database", async function(){
        const mockUser = {
            first_name: "Roberto",
            last_name: "Perez",
            email: "roberto@gmail.com",
            age: 30,
            password: "RobertoRoberto30",
        }
        const response = this.usersManager.createUser(mockUser);
    
        const userid = response._id
        const user = await this.usersManager.getUserById(userid)
        user.first_name = "Rober"
    
        const responseUser = await this.usersManager.updateUser(userid, user)
    
        expect(response.first_name != responseUser.first_name).to.be.equal(true)
    });
});