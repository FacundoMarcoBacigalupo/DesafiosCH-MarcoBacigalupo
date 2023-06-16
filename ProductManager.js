class ProductManager{
    constructor(){
        this.products = []
    }



    getProducts(){
        return this.products
    }



    addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock || "" || null){
            console.error("All camps are obligatory");
        }

        let uniqueId
        if(this.products.length === 0){
            uniqueId = 1
        }
        else{
            uniqueId = this.products.length + 1
        }

        const product ={
            id: uniqueId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if(this.products.some(ProductCode => ProductCode.code === code)){
            console.log("The code are ready exist")
        }
        else{
            this.products.push(product)
            console.log("Product added: ", this.products)
        }
    }



    getProductById(id){
        const productId = this.products.find(p => p.id === id)
        if(productId){
            return productId
        }
        else{
            console.log("Not found")
        }
    }
}






//Prueba
const testManager = new ProductManager()

testManager.addProduct("Product1", "Product1...", 2500, "product1.png", 1, 10)
testManager.addProduct("Product2", "Product2...", 5000, "product2.png", 2, 20)

//Error
//testManager.addProduct("Product3", "Product3...", 8000, "product3.png", 2, 20)

console.log("Products: ",testManager.getProducts())


console.log("Id of product: ",testManager.getProductById(1))
console.log("Id of product: ",testManager.getProductById(2))

//Error
//console.log("Id of product: ",testManager.getProductById(4))