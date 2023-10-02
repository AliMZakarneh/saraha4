import messageModel from "../../../DB/Model/Message.model.js";
import userModel from "../../../DB/Model/User.model.js";

export const getMessage = async(req,res)=>{
    const messageList = await messageModel.find({receiverId:req.user._id});
    return res.json({message:"success",messageList});
}

export const sendMessage = async(req,res,next)=>{
    const receiver = req.params.receiverId;
    const {message} = req.body;
    const user = await userModel.findById(receiver);
    if(!user){
        return res.status(404).json({message:'user not found'});
    }
    const createMessage = await messageModel.create({message:message,receiverId:receiver});

    return res.status(201).json({message:"success"});
    
}