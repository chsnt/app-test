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


}

module.exports = EventModel