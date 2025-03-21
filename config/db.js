const mongoose = require('mongoose')
const colors = require('colors')

const connectDB= async() =>{
    try{
await mongoose.connect(process.env.MONGODB)
console.log(`Connected to Database ${mongoose.connection.host}`.bgCyan)
    }catch(error){
        console.log('DB error',error,colors.bgBlue)
    }
}
module.exports = connectDB;

