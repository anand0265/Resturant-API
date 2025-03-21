const mongoose = require('mongoose')

//Schema
const ordersSchema = new mongoose.Schema({
foods:[
    {
        type:mongoose.Schema.Types.ObjectId,
        red:'Foods'
    
    }
],
payment:{

},
buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
status:{
    type:String,
    enum:['Preparing','prepare','on the way','delivered'],
    default:"preparing"
}
   
   
},{timestamps:true})

//exort
module.exports = mongoose.model("Orders",ordersSchema)