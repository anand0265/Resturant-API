const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// Register Controller
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone,answer } = req.body;

        // Validation
        if (!userName || !email || !password || !phone || !answer) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields",
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists",
            });
        }

         // Hash password before saving
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            userName,
            email,
            password : hashedPassword, // Store the hashed password
            phone,
            answer,
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error: error.message,
        });
    }
};


// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password",
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found",
            });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Hide password in response
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error: error.message,
        });
    }
};




module.exports = { registerController, loginController};
