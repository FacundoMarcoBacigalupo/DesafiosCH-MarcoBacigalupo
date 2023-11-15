import chai from "chai";
import supertest from "supertest";
import { app } from "../src/app.js"
import { cartsModel } from "../src/dao/models/carts.model.js";


const expect = chai.expect;
const requester = supertest(app);


describe("Ecommerce API Test", function(){
    describe("Test of carts", function(){
        
        this.timeout(15000);
        
        before(async function(){
            await cartsModel.deleteMany({});
        });


        it("The endpoint POST / you must create a cart", async() =>{
            const response = await requester.post("/api/carts/")
            expect(response.body).to.have.property("status");
            expect(response.body.status).to.be.equal("Success");
        });



        it("The endpoint GET by ID /:cid you must search for a product in the cart by id", async() =>{
            const response = await requester.get("/api/cart/:cid")
        });



        it("The endpoint GET by ID /:cid/product/:pid you must search for a product in the cart by id", async() =>{
            const response = await requester.get("/api/cart/:cid/product/:pid")
        });
    });
});