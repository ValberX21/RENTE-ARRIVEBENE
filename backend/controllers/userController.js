const User = require("../models/User");

exports.createUser = async (req,res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({message:"User created"})
    }
    catch(error){
        res.status(500).json({message: "Erro creating user", error})
    }
}