class EventModel extends BaseModel {
    constructor() {
        super()
        this.history = new this.constructor.History()
    }

    static get table() {
        return undefined
    }


}

module.exports = EventModel