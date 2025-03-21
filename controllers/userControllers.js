const userModel = require("../models/userModel");
const bcrypt= require('bcrypt')

// GET user Info
const getUserController=async(req,res)=>{
try {
    const user = await userModel.findById({_id:req.body.id})
    //validation
    if(!user){
        return res.status(404).send({
            success:false,
            message:"User Not Found"
        })
    }
    //handle password
    user.password=undefined
    //resp
    res.status(200).send({
        success:true,
        message:"User get Successfull",
        user
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in getuser API"
    })
}
}


// UPDATE User 
const updateUserController=async(req,res)=>{
try {
    // find user
    const user= await userModel.findById({_id: req.body.id})
    // validation
    if(!user){
        return res.status(404).send({
            success:false,
            message:'User not Found'
        })
    }
    //update
    const { userName, phone, address } = req.body;

     // Ensure address is a string if it's an array
     if (Array.isArray(address)) {
        address = address.join(", "); // Convert array to a comma-separated string
      }
  
    if(userName) user.userName=userName;
    if (phone) user.phone=phone;
    if (address) user.address=address;
    // save user
    await user.save()
    res.status(200).send({
        success:true,
        message:'User Update Successfuly'
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in Update APT',
        error
    })
    
}
}

// RESET PASSWORD
const resetPasswordController=async(req,res)=>{
try {
    const {email,newPassword} = req.body;
    if(!email || !newPassword ){
        return res.status(500).send({
            success:false,
            message:"Please Provide All fields"
        })
    }
    
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(500).send({
           success:false,
           message:"User Not Found or Invalid answer"
        })
    }

    
             // Hash password before saving
             const salt = await bcrypt.genSalt(10);
             const hashedPassword = await bcrypt.hash(newPassword, salt);
             user.password=hashedPassword;
             await user.save()
             res.status(200).send({
                success:true,
                message:"Password reset successfully"
             })
    
} catch (error) {
    console.log(error)
res.status(500).send({
    success:false,
    message:"Error in Reset Pasword API",
    error
})    
}
}


// Update Password
const updatePasswordController=async(req,res)=>{
try {
    const user= await userModel.findById({_id:req.body.id})
    if(!user){
        return res.status(500).send({
            success:false,
            message:"User Not Found"
        })
    }
    //get data from user
    const {OldPassword, newPassword}=req.body
    if(!OldPassword || !newPassword){
       return res.status(500).send({
        success:false,
        message:"Provide OldPassword and newPassword"
       })
    }
    
     // Check if password is correct
            const isMatch = await bcrypt.compare(OldPassword, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid OldPassword",
                });
            }
           
            // Hash password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            user.password=hashedPassword;
            await user.save()
            res.status(200).send({
               success:true,
               message:"Password Update Successfully"
            })

} catch (error) {
    console.log(error)
   res.status(500).send({
    success:false,
    message:"Error in Update Password API",
    error
   })
}
}

// Delete User
const deleteUserController=async(req,res)=>{
try {
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
        success:true,
        message:"Delete User Successfully"
    })
    
} catch (error) {
    console.log(error)
  res.status(500).send({
    success:false,
    message:"Error in DeleteUser API",
  })
    
}
}
module.exports ={getUserController, updateUserController,resetPasswordController, updatePasswordController,deleteUserController} 