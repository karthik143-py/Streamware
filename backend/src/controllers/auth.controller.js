import User from '../models/User.js';
import { upsertStreamUser } from '../lib/stream.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export async function login(req, res) {   
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:'Invalid email or password'});
        }
        const isMatch=await user.matchpassword(password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid email or password'});
        }
        const token=jwt.sign({id:user._id},"p3J6xJz2V8H3pAqlYgW+F8EoT+mc6mW0Uj5qW5RgBzU=",{expiresIn:'7d'});
        res.cookie('jwt',token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict'
        });
        res.status(201).json({success:true,user:user});
    }catch(err){
        res.status(500).json({ message: 'Internal server error' });
    }
}
export async function signup(req, res) {
    const { fullname, email, password } = req.body;
    try {
        if (!fullname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const ext=await User.findOne({email});
        if(ext){
            return res.status(400).json({message:'Email already in use'});
        }
        const idx= Math.floor(Math.random()*100)+1;
        const avatar=`https://avatar.iran.liara.run/public/${idx}.png`;
        const newUser=await User.create({
            fullname,
            email,
            password,
            photoUrl:avatar
        });

        try{
            await upsertStreamUser({
            id:newUser._id.toString(),
            name:newUser.fullname,
            email:newUser.email,
            image:newUser.photoUrl || ""
            });
            console.log('Stream user synced successfully'); 
        }
        catch(err){
            console.error('Error syncing user with Stream:',err);
        }
        const token=jwt.sign({id:newUser._id},"p3J6xJz2V8H3pAqlYgW+F8EoT+mc6mW0Uj5qW5RgBzU=",{expiresIn:'7d'});
        res.cookie('jwt',token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict'
        });
        res.status(201).json({success:true,user:newUser});
    
    
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
export function logout(req, res) {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
}

export async function onboard(req,res){
    try{
        const userId=req.user._id;
        const {bio,nativeLanguage,learningLanguage,location}=req.body;
        if(!bio || !nativeLanguage || !learningLanguage || !location){
            return res.status(400).json({message:'All fields are required'});
        }
        const updatedUser=await User.findByIdAndUpdate(userId,{
            ...req.body,
            isonborded:true,
        },{new:true});
        
        if(!updatedUser){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({success:true,user:updatedUser});
        try{
            await upsertStreamUser({
            id:updatedUser._id.toString(),
            name:updatedUser.fullname,
            email:updatedUser.email,
            image:updatedUser.photoUrl || ""
        });
            console.log('Stream user synced successfully');
        }
        catch(err){
            console.error('Error syncing user with Stream:',err);
        }
        
    }
    catch(err){
        res.status(500).json({ message: 'Internal server error' });
    }
}