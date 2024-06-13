const asynchandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../../models/User');


const createUser = asynchandler (async (req,res)=>{
    const {username,email,password} = req.body;
if(!username || !email || !password){
    return res.status(400).send({
        message:"Please fill all the fields"
    });
}

    // const userExist = await User.findOne({email});
    // if(userExist){
    //     res.status(400);
    //     throw new Error('User already exist');
});