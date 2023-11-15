import chai from "chai";
import supertest from "supertest";
import { app } from "../src/app.js"
import { productsModel } from "../src/dao/models/products.model.js";
import { ProductsController } from "../src/controller/products.controller.js";


const expect = chai.expect;
const requester = supertest(app);


describe("Ecommerce API Test", function(){
    describe("Test of products", function(){
        
        this.timeout(15000);
        
        before(async function(){
            await productsModel.deleteMany({});
        });


        it("The endpoint POST / you must create a product", async() =>{
            const newProduct = {
                title:"Nike Shoe",
                description:"Nike edition special",
                code:"001A",
                price:4000,
                status:"active",
                stock:23,
                category:"Zapatilla",
            }

            const response = await requester.post("/api/products/").send(newProduct)
            expect(response._id).to.be.ok
        });



        it("The endpoint GET / you must bring all the products", async()=>{
            const response = await requester.get("/api/products/");
            expect(response.body).to.have.property("status");
            expect(response.body.status).to.be.equal("Success");
        });



        it("The endpoint GET by ID /:pid you must search for a product by id", async() =>{
            const responseGet = await requester.get("/api/products/");
            const productId = responseGet.body.data._id

            const product = await ProductsController.getProductsById(productId)

            const response = await requester.get(`/api/products/:${product}`)

            expect(Number(response._id)).to.be.ok
            expect(response.body).to.have.property("status");
            expect(response.body.status).to.be.equal("Success");
        });
    });
});