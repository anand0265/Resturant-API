const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { placeOrderController, orderStatusController } = require('../controllers/orderController');
const adminMiddleware = require('../middlewares/adminMiddleware');


const router = express.Router();

// PlaceOrder
router.post('/placeorder',authMiddleware,placeOrderController)

// Order Status 
router.post('/orderstatus/:id',authMiddleware, adminMiddleware, orderStatusController)

module.exports=router;
