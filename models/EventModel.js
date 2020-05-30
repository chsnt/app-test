const BaseModel = require('./BaseModel')

class EventModel extends BaseModel {
    constructor(obj) {
        super()
        this.NAME = obj.NAME
        this.START_DATE = obj.START_DATE
        this.END_DATE = obj.END_DATE
    }

    static get table() {
        return "EVENTS"
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


}

module.exports = EventModel