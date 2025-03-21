const orderModel = require("../models/orderModel")

// Place Order
const placeOrderController=async(req,res)=>{
try {
    const {cart} = req.body
    if(!cart){
        return res.status(500).send({
            success:false,
            message:"please food cart or payment Method"
        })
    }
    let total = 0
    // calculate price
   cart.map((i) =>{
    total += i.price
   })

   const newOrder = new orderModel({
    foods:cart,
    payment: total,
    buyer: req.body.id
   })
   await newOrder.save()

   res.status(201).send({
    success:true,
    message:"Order Placed Successfully"
   })
} catch (error) {
    console.log(error)
   res.status(500).send({
    success:false,
    message:"Error in PlaceOrder API"
   })
}
}

// order Status
const orderStatusController=async(req,res)=>{
    try {
        const orderId = req.params.id
        if(!orderId){
            return res.status(500).send({
                success:false,
                message:"provide order ID"

            })
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        res.status(200).send({
            success:true,
            message:"Order Status Updated"
        })
    } catch (error) {
        console.log(error)
       res.status(500).send({
        success:false,
        message:"Error in Order Status  API"
       })
    }
}

module.exports={placeOrderController, orderStatusController}