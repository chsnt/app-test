const BaseModel = require('../../models/BaseModel')

module.exports =  {
    list:async ()=> {
        const res = await BaseModel.list()
        return res
    },
    getById:async (id)=> {
        const res = await BaseModel.getById(id)
        return res
    },
    create:async (obj)=> {
        const res = await BaseModel.create(obj)
        return res
    },
    update:async (obj)=> {
        const res = await BaseModel.update(obj)
        return res
    },
}
