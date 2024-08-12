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
        // const iat = Math.floor(Date.now() / 1000);
        // const exp = iat + 60 * 60; // 60 minutes from `iat`
        
        // console.log('iat:', iat);
        // console.log('exp:', exp);
      
        // const token = jwt.sign(
        //   { userId: user._id, username: user.username, iat: iat - 30, exp: exp },
        //   process.env.JWT_SECRET
        // );
      
        // console.log('Generated token:', token);
        const token = jwt.sign({ userId: user._id, username: user.username, }, process.env.JWT_SECRET,
            { expiresIn: '30h' });
            res.status(200).json({ token });
       return;

});

module.exports = {login};