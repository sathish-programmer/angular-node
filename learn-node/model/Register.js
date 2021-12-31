const mongoose = require("mongoose");
const { use } = require("../routes/posts");


const userRegister = new mongoose.Schema({
    "name":{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    "email":{
        type: String,
        min: 6,
        max: 255
    },
    "password":{
        type: String,
        min: 6,
        max: 1024
    },
    "Date":{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('userRegister', userRegister);