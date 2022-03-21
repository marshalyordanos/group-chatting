const mongoose = require('mongoose');
const Validator = require('validator');


const chatSchema = mongoose.Schema({
    username:String,
    chat:String,
    

},{
    timestamps:true
})

const Chat = mongoose.model('Chat',chatSchema)

module.exports = Chat