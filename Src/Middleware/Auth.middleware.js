import jwt from 'jsonwebtoken';
import userModel from '../DB/Model/User.model.js';

export const auth = async (req,res,next)=>{
   
   try{
    const {authorization} = req.headers;
    if(!authorization?.startsWith(process.env.BEARERKEY)){
        return res.json({message:"authariztion invalid"});
    }
    const token = authorization.split(process.env.BEARERKEY)[1];
    if(!token){
        return res.json({message:'authariztion invalid'});
    }
    const decoded = jwt.verify(token,process.env.PASSWRDLOGINTOKEN);
    const authUser = await userModel.findById(decoded.id).select("userName email");
    if(!authUser){
        return res.json({message:"not register account"});
    }

    req.user =authUser;

    next();
   }
   catch(err){
    return res.json({message:'catch error',error:err.stack});
   }

}