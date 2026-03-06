import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protectRoute(req,res,next){
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }
        const decoded=jwt.verify(token,"p3J6xJz2V8H3pAqlYgW+F8EoT+mc6mW0Uj5qW5RgBzU=");
        if(!decoded){
            return res.status(401).json({message:'Unauthorized'});
        }
        const user=await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({message:'Unauthorized'});
        }
        req.user=user;
        next();
    }catch(err){
        return res.status(401).json({message:'Unauthorized'});
    }
}
