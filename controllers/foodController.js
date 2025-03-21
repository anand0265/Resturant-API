const foodModel = require("../models/foodModel");

// Create Food
const createFoodController=async(req,res)=>{
try {
    const {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount
    } = req.body;
    
    if (!title || !description || !price || !resturant) {
        return res.status(500).json({
            success: false,
            message: "Title, description, price, and restaurant ID are required",
        });
    }
    const newFood = new  foodModel({
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount
    })
    await newFood.save()
    res.status(201).send({
        success:true,
        message:"New Food Iem Created",
        newFood
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Create Food API",
        error
    })
}
}

// getall Food
const getAllFoodController=async(req,res)=>{
try {
    const foods = await foodModel.find({})
    if(!foods){
        return res.status(500).send({
            success:false,
            message:"no food item found"
        })
    }
    res.status(200).send({
        success:true,
        totalFoods:foods.length,
        foods
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in GET Food API",
        error
    })
}
}

// get food By Id
const getSingleFoodController=async(req,res)=>{
try {
    const {foodId}= req.params
    if(!foodId){
        return res.status(5000).send({
            success:false,
            message:"Please Provide Id"
        })
    }
    const food = await foodModel.findById(foodId)
    if(!food){
        return res.status(500).send({
            success:false,
            message:"No food found in given id"
        })
    }
    res.status(200).send({
        success:true,
        food
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Errror in get single food API"
    })
}
}

// get food by Resturant
const getFoodByResturantController=async(req,res)=>{
    try {
        const {resturantId}= req.params.id
        if(!resturantId){
            return res.status(5000).send({
                success:false,
                message:"Please Provide Id"
            })
        }
        const food = await foodModel.find({resturant:resturantId})
        if(!food){
            return res.status(500).send({
                success:false,
                message:"No food found in given id"
            })
        }
        res.status(200).send({
            success:true,
            message:"Food base on resturant",
            food
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Errror in get single food API"
        })
    }
    }

// Update Food
const updateFoodController=async(req,res)=>{
try {
   
    const {foodId}= req.params
    if(!foodId){
        return res.status(5000).send({
            success:false,
            message:"Please Provide Id"
        })
    }
    const food = await foodModel.findById(foodId)
    if(!food){
        return res.status(500).send({
            success:false,
            message:"No food found in given id"
        })
    }
    const {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount
    } = req.body

    const updatedFood = await foodModel.findByIdAndUpdate(foodId,{
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount
    },{new:true})
    res.status(200).send({
        success:true,
        message:"Food Item was Updated"
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Update Food API"
    })
}
}
  
// Delete Food
const deleteFoodController=async(req,res)=>{

    try {
        const foodId = req.params
        if(!foodId){
            return res.status(500).send({
                success:false,
                message:"Provide FOOD id"
            })
        }
        const food = await foodModel.findById(foodId)
           if(!food){
            return res.status(500).send({
                success:false,
                message:"Food Not found in this Id"
            })
           }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success:true,
            message:"Food Delete Successfully"
        })
        
    } catch (error) {
        console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Delete Food API"
    })
    }
}



module.exports= {createFoodController,
    getAllFoodController, 
    getSingleFoodController, getFoodByResturantController,
updateFoodController, deleteFoodController}