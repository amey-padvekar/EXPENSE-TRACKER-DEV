const userModel = require("../models/userModel");
// login callback
const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email,password});
        if(!user){
            return res.status(404).send("User not found")
        }
        res.status(200).json({
            success:true,
            user
        });
        
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

const registerController = async(req,res)=>{
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            success:true,
            newUser
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }

}

const resetController = async(req,res)=>{
    try {
        await userModel.findOneAndUpdate({email:req.body.email},{password:req.body.newpassword});
        res.status(200).json({
            success:true,
            response
        });
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

const userUpdateController = async(req,res)=>{
    try {
         await userModel.findOneAndUpdate({_id:req.body.userId},req.body.payload);
        res.status(200).json({
            success:true,
        });
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

const getUserController = async(req,res)=>{
    try {
        const user = await userModel.findById({_id:req.body.userId});
        if(!user){
            return res.status(404).send("User not found")
        }
        res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

module.exports = {loginController, registerController, resetController, userUpdateController, getUserController}