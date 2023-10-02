import userModel from "../../../DB/Model/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signinSchema, signupSchema } from "../Auth.validation.js";
import SendEmail from "../../../Services/SendEmail.js";

export const signup = async(req,res,next)=>{
    const {userName,email,password,gender} = req.body;
    const user  = await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:'email is exist'});
    }
    const hashPassowrd = bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    const createUser = userModel.create({
        userName,email,password:hashPassowrd,gender
    });
    const token = jwt.sign({email},process.env.EMAILTOKEN,{expiresIn:'1h'});
    const refreshToken = jwt.sign({email},process.env.EMAILTOKEN,{expiresIn:60*60*24});
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
    const refreshLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}`;
    const html = `<a href=${link} >verify email</a> <br/> or <a href=${refreshLink}>request new email to verify your email</a>`;
    SendEmail(email,"confirm email",html);
    return res.status(201).json({message:"success",user});
    
}

export const signin = async(req,res,next)=>{
    
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"data invalid"});
    }
    if(!user.confirmEmail){
        return res.status(400).json({message:"plz confirm your email"});
    }
    const userPassword = bcrypt.compareSync(password,user.password);
    if(!userPassword){
        return res.status(404).json({message:"data invalid"});
    }
    const token = jwt.sign({id:user._id},process.env.PASSWRDLOGINTOKEN,{expiresIn:'1h'});
    return res.status(200).json({message:"login success",token});
}

export const confirmEmail = async (req,res,next)=>{
    const {token} = req.params;
    const decoded = jwt.verify(token,process.env.EMAILTOKEN);
    const user = await userModel.findOneAndUpdate({email:decoded.email,confirmEmail:false},{confirmEmail:true});
    if(!user){
        return res.status(400).json({message:"your email is verified"});
    }
    else{
        return res.redirect(process.env.FRONTEND_TOKEN);
    }
}

export const newConfirmEmail = async (req,res,next)=>{
    const {refreshToken} = req.params;
    const decoded = jwt.verify(refreshToken,process.env.EMAILTOKEN);
    const token = jwt.sign({email:decoded.email},process.env.EMAILTOKEN,{expiresIn:'1h'});
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
    const html = `<a href=${link}>verify email</a>`;
    SendEmail(decoded.email,'confirm email',html);
    return res.status(201).json({message:"new email is sent successfully"});
}