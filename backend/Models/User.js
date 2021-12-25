const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    passportNumber:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    telephoneNumber:{
        type:String,
        required:true
    },
    countryNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    customerId:{
        type:String
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
