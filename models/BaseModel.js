const db = require('../db')


class BaseModel {

    constructor(id) {
        this.ID = id
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
        let sql = `select * from "${this.table}"`
        let data
        try {
            data = await db.any(sql)
        } catch (e) {
            console.log('ERROR:', e);
        }
        if (!data.length) {
            throw new Error(`There's no rows in table ${this.table}`)
        }
        return data
    }


    static async create(obj) {
        let data
        const fields = Object.keys(obj)
        const values = fields.map(f => obj[f])
        const sql = `
            INSERT INTO "${this.table}" ("${fields.join(', ')}") 
            VALUES (${values.join(', ')}) 
            RETURNING "ID";            
            `
        console.log(sql)

        try {
            data = await db.any(sql)
        } catch (e) {
            console.log('ERROR:', e);
        }

        if (!data.length) {
            throw new Error(`Can't return data`)
        }
        return data
    }

    static async update(obj) {
        let data
        const values = []
        let setString = ``
        let i = 0
        for (let [key, value] of Object.entries(obj)) {
            i++;
            setString += `"${key}" = $${i},`
            values.push(value)
        }
        setString = setString.slice(0, -1)
        const sql = `
            UPDATE "${this.table}" 
            SET ${setString}
            WHERE "ID" = ${obj.ID}
            RETURNING "ID";            
            `
        console.log(sql)

        try {
            data = await db.any(sql, values)
        } catch (e) {
            console.log('ERROR:', e);
        }

        if (!data.length) {
            throw new Error(`Can't return data`)
        }
        return data
    }


}

module.exports = BaseModel