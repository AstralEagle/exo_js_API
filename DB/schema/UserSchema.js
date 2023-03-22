const { Schema, model, ShemaType} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)

module.exports = User;