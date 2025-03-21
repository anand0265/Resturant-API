const mongoose = require('mongoose')

//Schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:[String],
    },
    phone:{
        type:String,
       
    },
    usertype:{
        type:String,
        required:[true,'user type is required'],
        default:'client',
        enum:['client','admin']
    },
    profile:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    },
    answer:{
        type:String,
        required:[true, "Answer is required"],
    }
},{timestamps:true})

//exort
module.exports = mongoose.model("User",userSchema)