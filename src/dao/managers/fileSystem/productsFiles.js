import fs from "fs"
import {__dirname} from "../../../utils.js"
import path from "path"


class ProductManager{
    constructor(fileName){
        this.path = path.join(__dirname, `/files/${fileName}`)
    }



    fileExist(){
        return fs.existsSync(this.path)
    }


    async addProduct(title, description, code, price, status, stock, category, thumbnail){
        try {
            const contentTheFile = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(contentTheFile)
            let newId = 1
            if(products.length > 0){
                newId = products[products.length - 1].id + 1
            }

            const product ={
                id: newId,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail
            }


            if(this.fileExist()){
                const contentTheFile = await fs.promises.readFile(this.path, "utf-8")
                const products = JSON.parse(contentTheFile)
                products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
                return product
            }
            else{
                await fs.promises.writeFile(this.path, JSON.stringify([product], null, "\t"))
                return product
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

                    await fs.promises.writeFile(this.path, JSON.stringify(content, null, "\t"));
                    return content
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
                    return contentID
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
                    const data = JSON.stringify(content, null, "\t");
                    fs.promises.writeFile(this.path, data);
                    return data
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