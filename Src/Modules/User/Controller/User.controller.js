import userModel from "../../../DB/Model/User.model.js"


export const profile = async(req,res)=>{
    
    return res.json({message:req.user});
}