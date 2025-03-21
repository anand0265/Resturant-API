const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturant, getResturantByIdController, deleteResturantController } = require('../controllers/resturantController');

const router = express.Router();

// CREATE Resturant
router.post('/create',authMiddleware,createResturantController) 



// Get all resturant || GET
router.get('/getall',getAllResturant)

// Get resturant by Id
router.get('/get/:id',getResturantByIdController)

// Delete resturant 
router.delete('/delete/:id',authMiddleware,deleteResturantController)

module.exports=router;
