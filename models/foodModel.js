const mongoose = require('mongoose')

//Schema
const foodSchema = new mongoose.Schema({
   title:{
    type:String,
    required:[true,'Food Title is require']
   },
   description:{
    type:String,
    required:[true,'Food description is require']
   },
   price:{
type:Number,
required:[true,'Food price is required']
   },
   imageUrl:{
    type:String,
    default:"https://promova.com/content/types_of_food_cc500603ae.png"
   },
   foodTags:{
    type:String,
   },
   category:{
    type:String,
   },
   code:{
    type:String,
   },
   isAvailable:{
    type:Boolean,
    default:true,
   },
   resturant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Resturant'
   },
   rating:{
    type:Number,
    default:5,
    min:1,
    max:5
   },
   ratingCount:{
    type:String,
   },
   
},{timestamps:true})

//exort
module.exports = mongoose.model("Foods",foodSchema)