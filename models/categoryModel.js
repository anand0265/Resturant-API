const mongoose = require('mongoose')

//Schema
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Cateory title is required']
    },
    imageUrl:{
        type:String,
        default:"https://promova.com/content/types_of_food_cc500603ae.png"
    },
   
},{timestamps:true})

//exort
module.exports = mongoose.model("Category",categorySchema)