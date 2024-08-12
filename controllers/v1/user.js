const asynchandler = require('express-async-handler');
const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const User = require('../../models/User');


const createUser = asynchandler (async (req,res)=> {
    const {username,email,password, profilePicture} = req.body;
if(!username || !email || !password){
    return res.status(400).send({
        message:"Please fill all the fields"
    });
}

let photo = profilePicture || null;
const hashedPassword = await bcrypt.hash(password,10);
//check if email and username already exists
const foundUser = await User.findOne({$or: [{email: email}, {username: username}]}).exec();  

if (foundUser) {
res.status(400).send({message: "User already exists"});
return;
        }


const user = new User ({
    username,
    email,
    password : hashedPassword,
    profilePicture: photo
    }); 
    try{
        const createdUser = await user.save();
        res.status(201).send({
            message:"User created successfully",
            user:createdUser
            });
            }catch(error){
                res.status(400).send({
                    message:"Error creating user",
                    error:error.message
                    }); 
                }

});

const getUser = asynchandler(async (req,res) =>{
   try{
    const userId = req.user.userId;
 
    if (!mongoose.Types.ObjectId.isValid(userId)) {
         res.status(400).json({ message: "Invalid user ID" });
        return;
        }
        const user = await User.findById(userId)
        .catch((error) => {
            return res.status(500).json({
                 message: error.message });
        });
        if (!user) {
             res.status(404).json({ message: "User not found" });
            return;
            }
            res.status(200).json({ user });
   } catch (err){
    res.status(500).json({ message: err.message });
   }
            });
    
 const updateUser = asynchandler (async (req,res) =>{
    const userId = req.user.userId;
    const { username, email } = req.body;
    let updatedUserData = {};
    if (username) updatedUserData.username = username;
    if (email) updatedUserData.email = email;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {new: true})
    .catch((error) => {
        return res.status(500).json({
            message: error.message
            });
            });
if (!updatedUser){
    res.status(404).json({ message: "User not found" });
    return;

}
res.status(200).json({ user: updatedUser });
 });

 const archiveUser = asynchandler (async (req,res) =>{
    const userId = req.user.userId;
    const archivedUser = await User.findByIdAndUpdate(userId, { archive: true }, { new: true });
    if (!archivedUser){
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(200).json({ user: archivedUser });

 });

module.exports = {createUser, getUser, updateUser, archiveUser};