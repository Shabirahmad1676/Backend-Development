const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;


exports.register = async (req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password)
            return res.status(400).json({error:'All fields are required'})

    const userExists = await User.findOne({email});
    if(userExists)
        return res.status(4000).json({error:'Email already available'})
    } catch (error) {
        res.json({error:err.message})
    }
}



exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password)
            return res.json({error:'All fields required'})
        const user = await User.findOne({email});
        if(!user)
            return res.json({error:'Invalid Credintials'})

        const token = jwt.sign({userId:user.id}, JWT_SECRET, {expiresIn:'1d'})
        res.jso({token,user: {name:user.name,email:user.email}})
    } catch (error) {
        res.json({error:err.message})
    }
}