import fs from "fs"


class ProductManager{
    constructor(path){
        this.path = path
        this.uniqueId = 1
    }



    fileExist(){
        return fs.existsSync(this.path)
    }



    async addProduct(title, description, price, thumbnail, code, stock){
        try {
//Verify if all camps are full
        if(!title || !description || !price || !thumbnail || !code || !stock || "" || null){
            console.error("All camps are obligatory");
        }



        const product ={
            id: this.uniqueId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.uniqueId++
//Verify if the code are ready exist
        const contentTheFile = await fs.promises.readFile(this.path, "utf-8")
        const products = JSON.parse(contentTheFile)

        if(products.some(productCode => productCode.code === code)){
            console.log("The code are ready exist")
        }
        else{
            if(this.fileExist()){
                const contentTheFile = await fs.promises.readFile(this.path, "utf-8")
                const products = JSON.parse(contentTheFile)
                products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
                console.log("Product create")
            }
            else{
                await fs.promises.writeFile(this.path, JSON.stringify([product], null, "\t"))
                console.log("Product create")
            }
            }
        }

        catch (error){
            console.log(error.message)
        }
    }



    async updateProduct(id, updateCamp){
        try{
            if(this.fileExist){
                const contentFile = await fs.promises.readFile(this.path, "utf-8")
                const content = JSON.parse(contentFile)
                const contentID = content.findIndex(product => product.id === id)
                
                if(contentID === -1){
                    console.log("File not exist")
                    return
                }
                else{
                    const updateProduct = {...content[contentID], ...updateCamp}
                    content[contentID] = updateProduct

                    await fs.promises.writeFile(this.path, JSON.stringify(content, null, 2));
                    return console.log(`Updated product with the ID: ${id}`)
                }
            }
            else{
                console.log("The file not exist")
            }
        }
        catch (error){
            console.log(error.message)
        }
    }



    async getProducts(){
        try{
            if(this.fileExist){
                const contentTheFile = await fs.promises.readFile(this.path, "utf-8")
                const content = JSON.parse(contentTheFile)
                return content
            }
            else{
                console.log("The file not exist")
            }
        }
        catch (error){
            console.log(error.message)
        }
    }



    async getProductById(id){
        try {
            if(this.fileExist){
                const contentFile = await fs.promises.readFile(this.path, "utf-8")
                const content = JSON.parse(contentFile)

                const contentID = content.find(c => c.id === id)
                if(contentID){
                    return console.log(`Product with the ID ${id}, is:`, contentID)
                }
                else{
                    console.log(`Not exits a product with the id: ${id}`)
                }
            }
            else{
                console.log("The file not exist")
            }
        } 
        catch (error){
            console.log(error.message)
        }
    }



    async deleteProduct(id){
        try {
            if(this.fileExist()){
                const contentFile = await fs.promises.readFile(this.path, "utf-8")
                const content = JSON.parse(contentFile)
                const contentDelete = content.find(cd => cd.id === id)

                if(contentDelete !== -1){
                    content.splice(contentDelete, 1)
                    const data = JSON.stringify(content, null, 2);
                    fs.promises.writeFile(this.path, data);
                    return console.log(`Product with this ID(${id}) is deleted:`)
                }
                else{
                    console.log(`Not exits a product with the id: ${id}`)
                }
            }
            else{
                console.log("The file not exist")
            }
        }
        catch (error){
            console.log(error.message)
        }
    }
}



export default ProductManager