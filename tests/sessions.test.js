import chai from "chai";
import supertest from "supertest";
import { app } from "../src/app.js"


const expect = chai.expect;
const requester = supertest(app);


describe("Ecommerce API Test", function(){
    describe("Test of sessions", function(){
        
        this.timeout(15000);


        it("The endpoint POST /register you must register the user", async() =>{
            const response = await requester.post("/api/sessions/register").send(newProduct)
        });



        it("The endpoint GET /login you must login the user after he is register", async()=>{
            const response = await requester.get("/api/sessions/login");
        });



        it("The endpoint GET by ID /github you must register the user with GitHub", async() =>{
            const responseGet = await requester.get("/api/sessions/github");
        });
    });
});