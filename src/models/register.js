const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    phnumber :{
        type:Number,
        required:true,
        unique:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },
    cpassword :{
        type:String,
        required:true
    },

})

//for collections

const Register = new mongoose.model("Register",userSchema);

module.exports = Register;