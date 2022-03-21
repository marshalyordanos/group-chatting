const mongoose = require('mongoose');
const Validator = require('validator');


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: [true, 'Please tell us your username!'],
        unique:true,
    },
    email:{
        type:String,
        required:[true, 'Please provide your email'],
        unique:true,
        lowercase:true,
        Validate:[Validator.isEmail,'Please provide a valid email.']
    },
    password:{
        type:String,
        required:[true, 'Please provide your password'],

    },
    passwordConfirm:{
        type:String,
        required:[true, 'Please confirm your password '],
        validate:{validator:function(val){
            return val== this.password
        },
        message:"The passwor is not match!"
     }
    }

})

const User = mongoose.model('User',userSchema)

module.exports = User