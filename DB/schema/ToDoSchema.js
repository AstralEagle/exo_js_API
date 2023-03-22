const { Schema, model, ShemaType} = require('mongoose');

const todoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    listID: {
        type: Schema.Types.ObjectId,
        ref: "List",
        required: true,
    }
})

const ToDo = model('ToDo', todoSchema)

module.exports = ToDo;