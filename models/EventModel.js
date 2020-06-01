const BaseModel = require('./BaseModel')
const db = require('../db')

class EventModel extends BaseModel {
    constructor(obj) {
        super(obj)
        this.NAME = obj.NAME
        this.START_DATE = obj.START_DATE
        this.END_DATE = obj.END_DATE
    }

    static get table() {
        return "EVENTS"
    }

    static get columns() {
        return {
            ID: {
                type: "NUMBER",
            },
            NAME: {
                type: "STRING",
            },
            START_DATE: {
                type: "TIMESTAMP",
            },
            END_DATE: {
                type: "TIMESTAMP",
            },
        }
    }

    static async create(obj) {
        let data
        const fields = Object.keys(obj)
        const fieldsQuoted = fields.map(f=>`"${f}"`)
        const values = fields.map(f => {
            const type = this.columns[f].type
            if (type === "STRING") return `'${obj[f]}'`
            if (type === "TIMESTAMP") return `to_timestamp(${obj[f]})`
            return obj[f]
        })
        const sql = `
            INSERT INTO "${this.table}" ("START_DATE", ${fieldsQuoted.join(', ')})
            VALUES (current_timestamp, ${values.join(', ')})
            RETURNING "ID";
            `
        console.log(sql)

        try {
            data = await db.any(sql)
            if (!data.length) {
                throw new Error(`Can't return data`)
            }
        } catch (e) {
            console.log('ERROR:', e);
        }

        return data
    }


    static async update(obj) {
        if(!obj.ID) throw new Error(`Need ID`)
        let data
        const values = []
        let setString = ``
        let i = 0
        for (let [key, value] of Object.entries(obj)) {
            i++;
            setString += `"${key}" = $${i},`
            values.push(value)
        }
        setString += `"END_DATE" = current_timestamp`
        const sql = `
            UPDATE "${this.table}" 
            SET ${setString}
            WHERE "ID" = ${obj.ID}
            RETURNING "ID";            
            `
        console.log(sql)

        try {
            data = await db.any(sql, values)
            if (!data.length) {
                throw new Error(`Can't return data`)
            }
        } catch (e) {
            console.log('ERROR:', e);
        }

        return data
    }

}

module.exports = EventModel