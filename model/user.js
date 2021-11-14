const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        require: true,
    },
})

module.export = mongoose.model('user', UserSchema);