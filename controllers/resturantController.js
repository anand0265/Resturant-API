const resturantModel = require("../models/resturantModel");
const { findByIdAndDelete } = require("../models/userModel");


// Create Resturant || POST
const createResturantController=async(req,res)=>{
try {
    const {
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating, 
        ratingCount,
        code,
         coords
        }=req.body

        //validation 
        if (!title  || !coords) {
            return res.status(500).json({
                success: false,
                message: "Please provide Title and address",
            });
        }
        const newResturant = new resturantModel({title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating, 
            ratingCount,
            code,
             coords})

             await newResturant.save()
             res.status(201).send({
                success:true,
                message:"New Resturant Created successfully"
             })
        
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Create Resturant API"
    })
}
}


// Get all resturant || GET
const getAllResturant= async(req,res)=>{
try {
    const resturant = await resturantModel.find({})
    if(!resturant){
        return res.status(500).send({
            success:false,
            message:"No Resturant Available"
        })
    }
    res.status(200).send({
        success:true,
        totalCount:resturant.length,
        resturant
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Get All Resturannt",
        error
    })
}
}

// Get esturant by Id
const getResturantByIdController = async(req,res)=>{
    try {
        const resturantId= req.params.id
        // validation
        if(!resturantId){
            return res.status(500).send({
                success:false,
                message:"Please Provide Resturant Id"
            })
        }
        // find resturant
        const resturant = await resturantModel.findById(resturantId)
        if(!resturant){
            return res.status(500).send({
                success:false,
                message:"no resturant found"
            })
        }
        res.status(200).send({
            success:true,
            resturant
        })
       
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get Resturannt by Id API",
            error
        })
    }
}

//Delete resturant 
const deleteResturantController=async(req,res)=>{
try {
    const resturantId= req.params.id
        // validation
        if(!resturantId){
            return res.status(500).send({
                success:false,
                message:"No resturant Found OR Please Provide Resturant Id"
            })
        }
await resturantModel.findByIdAndDelete(resturantId)
res.status(200).send({
    success:true,
    message:"Resturant Delete Successfullly"
})
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error Delete Resturant API",
        error
    })
}
}


module.exports={createResturantController, getAllResturant, getResturantByIdController, deleteResturantController}