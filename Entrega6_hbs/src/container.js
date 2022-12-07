
//const fs = require("fs");
import * as fs from "fs"

export default class Container {

    constructor(fileName) {
        this.fileName = fileName
    }

    async save(product) {
        let data
        let objArr = []
        if (!fs.existsSync(this.fileName)) {
            throw new Error('File not found!, plase create your file Before! ' + this.fileName);
        }
        data = await fs.promises.readFile(this.fileName, 'utf-8')
        if (!data.length == 0) {
            objArr = JSON.parse(data)
            product.id = objArr.length + 1
            //throw new Error('File is empty! ' + this.fileName);
        } else {
            product.id = 1
        }
        objArr.push(product)
        await fs.promises.writeFile(this.fileName, JSON.stringify(objArr, null, 2))
        return product.id

    }
    async getById(id) {
        try {
            let data
            let objArr = []
            if (!fs.existsSync(this.fileName)) {
                throw new Error('File not found!, plase create your file Before! ' + this.fileName);
            }
            data = await fs.promises.readFile(this.fileName, 'utf-8')
            if ((data.length == 0) || (data == "[]")) {
                throw new Error('File is empty! ' + this.fileName);
            }
            objArr = JSON.parse(data)
            //Find object inside the array with the id 
            const objId = objArr.find((objArr) => objArr.id === id)
            if (objId != -1) {
                console.log(objId)
                return objId
            } else {
                console.log('The product with Id: ' + id + ' does not exists')
                return null
            }

        } catch (err) {
            throw new Error(`Error while reading File: ${err}`)
        }
    }
    async getAll() {
        try {
            let data = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
            return data
        } catch (err) {
            throw new Error(`Error while reading File: ${err}`)
        }
    }

    async deleteById(id) {
        let data
        let objArr = []
        if (!fs.existsSync(this.fileName)) {
            throw new Error('File not found!, plase create your file Before! ' + this.fileName);
        }
        data = await fs.promises.readFile(this.fileName, 'utf-8')
        if ((data.length == 0) || (data == "[]")) {
            throw new Error('File is empty! ' + this.fileName);
        }
        objArr = JSON.parse(data)
        //Find object inside the array with the id , the remove it from the array
        const objId = objArr.findIndex((objArr) => objArr.id === id)
        if (objId != -1) {
            objArr.splice(objId, 1);
            await fs.promises.writeFile(this.fileName, JSON.stringify(objArr, null, 2))
            console.log('Product with Id: ' + id + ' was deleted successfully')
        } else {
            console.log('The product with Id: ' + id + ' does not exists')
        }
    }

    async deleteAll() {
        if (!fs.existsSync(this.fileName)) {
            throw new Error('File not found!, plase create your file Before! ' + this.fileName);
        }
        try {
            await fs.promises.writeFile(this.fileName, '[]')
            console.log('All products were deleted successfully')
        } catch (err) {
            throw new Error(`Error while writing the File: ${err}`)
        }


    }

}






