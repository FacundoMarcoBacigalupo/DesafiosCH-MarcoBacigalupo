//EXAMPLES
const { ProductManager } = require("./ClassProductManager.js")

const filePath = "./users.json"


const manager = new ProductManager(filePath)

const operations = async() =>{
/*
//Add product
    try{
        manager.addProduct("laptop", "laptop samsung", 4000, "./laptopImg.jpg", 1, 22)
    }

    catch(error){
        console.log(error.message)
    }
*/

/*
//Update product
    try{
        const updateCamp = {description: "pc asus", price: 12000,};
        manager.updateProduct(2, updateCamp)
    }

    catch(error){
        console.log(error.message)
    }
*/

/*
//Get product
    try{
        manager.getProducts()
    }

    catch(error){
        console.log(error.message)
    }
*/


/*
//Get products by ID
    try{
        manager.getProductById(13)
    }

    catch(error){
        console.log(error.message)
    }
*/


/*
//Delete product
    try{
        manager.deleteProduct(13)
    }

    catch(error){
        console.log(error.message)
    }
*/
}

operations()
//EXAMPLES