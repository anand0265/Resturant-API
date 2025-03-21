const categoryModel = require('../models/categoryModel')

// Create Category
const createCategoryController=async(req,res)=>{
try {
    const {title,imageUrl} = req.body
    // validation
    if(!title ){
        return res.status(500).send({
            success:false,
            message:"please provide categoty title and image"
        })
    }

    const newCategory = new categoryModel({title,imageUrl})
    await newCategory.save();
    res.status(200).send({
        success:true,
        message:"Category Created",
        newCategory
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Create Category API",
        error
    })
}
}

// Get all Category
const getAllCategoryCotroller=async(req,res)=>{
    try {
        const categories = await categoryModel.find({})
        if(!categories){
            return res.status(500).send({
                success:false,
                message:"No Categories Found"
            })
        }
        res.status(200).send({
            success:true,
            totalCat: categories.length,
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get Category API",
            error
        })
    }
}

// Update Category
const updateCategoryController=async(req,res)=>{
try {
    const {id} = req.params
    const {title,imageUrl} = req.body
    const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
if(!updatedCategory){
    return res.status(500).send({
        success:false,
        message:"Not category found"
    })
}

res.status(200).send({
    success:true,
    message:"Updated Category Successfully"
})
    
} catch (error) {
    console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update Category API",
            error
        })
}
}


// Delete Category
const deleteCategoryController=async(req,res)=>{
try {
    const {id} = req.params
    if(!id){
        return res.status(500).send({
            success:false,
            message:"Please Provide Category Id"
        })
    }
    const category = await categoryModel.findById(id)
    if(!category){
        return res.status(500).send({
           success:false,
           message:"No Category Found in this Id"
        })
    }

    await categoryModel.findByIdAndDelete(id)
    res.status(200).send({
        success:true,
    message:"Category Deleted Successfully"
    })

} catch (error) {
    console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Delete Category API",
            error
        })
}
}

module.exports = {createCategoryController, getAllCategoryCotroller,updateCategoryController, deleteCategoryController}