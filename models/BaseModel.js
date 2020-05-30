const db = require('../db')


class BaseModel {

    constructor() {
        this.ID = undefined
    }

    static get table() {
        return 'BASE'
    }

    /**
     * Find get rows by ID
     */
    static async getById(id) {

        let data
        const sql = `
            select * 
            from "${this.table}" 
            where "ID"=${id}`


        try {
            data = await db.any(sql)

        } catch (e) {
            console.log('ERROR:', e);
        }

        if (!data.length) {
            throw new Error(`There's no rows in table ${this.table} where ID=${id}`)
        }
        return data
    }


    static async list() {
        let rows = await query(`
            select * 
            from "${this.table}"`)
        if (!rows.length) {
            throw new Error(`There's no rows in table ${this.table}`)
        }
        return rows
    }


    static async create(obj) {
        // obj = { "ID":10 }
        const fields = Object.keys(obj)
        const values = fields.map(f => obj[f])
        const sql = `
            INSERT * INTO "${this.table}" (${fields.join(', ')}) 
            VALUES (${values.join(', ')});            
            `
        let rows = await query(sql)
        // if (!rows.length) {
        //     throw new Error(`Cant create & insert into table ${this.table}`)
        // }
        return rows
    }


}

module.exports = BaseModel