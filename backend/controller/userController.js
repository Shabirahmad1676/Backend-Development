const User = require('../models/userModel')

exports.getUserData =  async (req,res)=>{
        try {
            const userId = req.userId;
            const user = await User.findById(userId)
            if(!user){
                return res.json({message:"not found user"})
            }

            res.json({
                success:true,
                userData :{
                    name:user.name,
                    isAccountVerified: user.isAccountverified
                }
            })
        } catch (error) {
    return res.json({err:error.message})
        }
}