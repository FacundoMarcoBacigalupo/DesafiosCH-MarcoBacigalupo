import { generateProducts } from '../utils.js'


export class MockingProducts{
    static createProducts = async(req, res) =>{
        try{
        let products = []
        
        for(let i = 0; i < 100; i++){
            products.push(generateProducts())
        }
        res.send({status:"Success", data: products})
        }
        catch (error){
            console.log(error.messagge)
            throw new error
        }
    }
}