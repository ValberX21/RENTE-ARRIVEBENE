const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const loginUser = async (req,res) => {

    const {email,password} =  req.body;

    try{
        const user = await User.findOne({email});
        
        if(!user) {
            return res.status(401).json({message:'Invalod credentials'});
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({message:'Invalod credentials'})
        }

        const token = jwt.sign(
            {id :user._id, name: user.name, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn:'1h'}
        );
        
        res.status(200).json({token});
    }
    catch(erro)
    {
        res.status(500).json({message: "Server erro in create token"})
    }
}

module.exports = {
    loginUser
};
