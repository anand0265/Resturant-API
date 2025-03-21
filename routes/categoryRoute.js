const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategoryCotroller, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();


// create Category
router.post('/create',authMiddleware,createCategoryController)

// get Category
router.get('/getall',getAllCategoryCotroller)

// Update Category
router.put('/update/:id',authMiddleware,updateCategoryController)

// delete Category
router.delete('/delete/:id',authMiddleware, deleteCategoryController)

module.exports= router;