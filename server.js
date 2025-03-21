const express = require('express')
const cors = require('cors')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')


const app = express()

// dot env configuration
dotenv.config()

// DB Coneection
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

const PORT = process.env.PORT || 8080;

// ROUTE
app.use('/api/auth',require("./routes/authroute"))
app.use('/api/user',require("./routes/userroute"))

app.use('/api/resturant',require("./routes/resturantRoute"))
app.use('/api/category',require("./routes//categoryRoute"))
app.use('/api/food',require("./routes/foodRoute"))
app.use('/api/order',require("./routes/orderRoute"))

  
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () =>{
    console.log(` app listening on port ${PORT}`.white.bgMagenta)
}) 