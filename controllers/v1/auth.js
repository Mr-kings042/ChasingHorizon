const asynchandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');


const login = asynchandler(async (req,res) =>{
    const {email,password} = req.body;
   if (!email || !password){
    res.status(400).json({message:"Please enter both email and password"})
    return; 
   }
    const user = await User.findOne({ email})
    .catch((err) =>{
        console.error(err);
        res.status(500).json({message: 'Error fetching user'});

    });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword){
        res.status(401).json({message: 'Invalid email or password'});
        return;
        }
        const token = jwt.sign({ userId: user._id, username: user.username}, process.env.JWT_SECRET,
            { expiresIn: '10h' });
            res.status(200).json({ token });
       return;

});

module.exports = {login};