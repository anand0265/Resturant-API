const express = require('express');
const {getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController }= require('../controllers/userControllers');
const { route } = require('./authroute');
const authMiddleware = require('../middlewares/authMiddleware');
const { reset } = require('colors');

const router = express.Router();

/// GET User
router.get('/getuser',authMiddleware,getUserController)

// UPDATE uSER
router.put('/updateuser',authMiddleware,updateUserController)

// Update Password
router.post('/updatepassword',authMiddleware, updatePasswordController)

// Reset Password
router.post('/resetpassword',authMiddleware,resetPasswordController)

// Delete User
router.delete('/deleteuser/:id',authMiddleware,deleteUserController)

module.exports=router;