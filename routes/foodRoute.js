const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, 
    getAllFoodController, 
    getSingleFoodController, 
    getFoodByResturantController, 
    updateFoodController,
    deleteFoodController} = require('../controllers/foodController');

const router = express.Router();

// Create Food || POST
router.post('/create',authMiddleware,createFoodController)

// Get Food || GET
router.get('/getall',getAllFoodController)

// Get Food By Id || GET
router.get('/get/:id',getSingleFoodController)

// Get Foof By Resturant
router.get('/getByResturant/:id',getFoodByResturantController)

//  UPDATE fOOD
router.put('/update/:id',authMiddleware,updateFoodController)

// Delete Food
router.delete('/delete/:id',authMiddleware, deleteFoodController)

module.exports=router;
