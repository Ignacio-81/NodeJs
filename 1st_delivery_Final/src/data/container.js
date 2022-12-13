import * as fs from "fs"
export default class Container {
    constructor(fileName) {
        this.fileName = fileName
    }

    async write(obj) {
        let data
        let objArr = []
        if (!fs.existsSync(this.fileName)) {
            throw new Error('File not found!, plase create your file Before! ' + fileName);
        }
        data = await fs.promises.readFile(this.fileName, 'utf-8')
        objArr = JSON.parse(data)
        objArr.push(obj)
        //await fs.promises.appendFile(this.fileName, JSON.stringify(obj, null, 2))
        await fs.promises.writeFile(this.fileName, JSON.stringify(objArr, null, 2))

    }

    async writeAll(obj) {

        if (!fs.existsSync(this.fileName)) {
            throw new Error('File not found!, plase create your file Before! ' + fileName);
        }
        await fs.promises.writeFile(this.fileName, JSON.stringify(obj, null, 2))

    }

    async readAll() {
        try {
            let data = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
            return data
        } catch (err) {
            throw new Error(`Error while reading File: ${err}`)
        }
    }
}






