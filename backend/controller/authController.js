const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


const JWT_SECRET = "123abcg23de";
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

  if (!name || !email || !password) {
  return res.json({ message: "All Fields are required!" });
}

const userExists = await User.findOne({ email });
if (userExists) {
  return res.json({ message: "Already exists" });
}

    const hashedpassword = await bcrypt.hash(password,10)

    const user = await User.create({
      name,
      email,
      password:hashedpassword
    });
    

    //it is token generator , and payload  (JWT has three parts, header, payload, signature)
    const token = jwt.sign({id:user._id}, JWT_SECRET, {expiresIn: '7d'});
    res.cookie('token', token , {
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 10    
    })

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.json({ error: "All fields required" });
 

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({id:user._id}, JWT_SECRET, {expiresIn: '7d'});

    res.cookie('token', token , {
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 10    
    })

    res.status(201).json({ message: "User LogIn successfully" });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.logOut = async (req,res)=>{
  try {
    res.clearCookie('token' , {
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 10    
    })
    res.status(201).json({ message: "User LogOut successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
    
  }
}