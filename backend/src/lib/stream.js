import {StreamChat} from 'stream-chat';

const apiKey="z3hsp375fcwc";
const apiSecret="qb82438shyv5ec8v2bsk5r8556wm8cs8c99r4e9567xbuncjtz6s76tatc9mxyx7";

const streamClient=StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser=async(userData)=>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData;
    }catch(err){
        console.error('Error creating/updating Stream user:',err);
    }
};

export const generateStreamToken=(userId)=>{
    try{
        const id=userId.toString();
        const token=streamClient.createToken(id);
        return token;
    }
    catch(err){
        console.error('Error generating Stream token:',err);
    }
};