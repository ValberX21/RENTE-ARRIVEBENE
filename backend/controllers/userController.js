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

exports.getAllUsers = async (req,res) => {

    try
    {
        const users = await User.find().sort({createdAt:-1});
        res.status(200).json(users);
    }
    catch(erro)
    {
        res.status(500).json({message:"Some error listing users"});
    }
}

exports.getUserById = async (req,res) => {
    try
    {
        const userDt = await User.findById(req.params.id);
        if(!userDt) return res.status(404).json({message:"User not found"});
        res.json(userDt);
    }
    catch(erro)
    {
        res.status(404).json({message:"Some error find user by this ID"});
    }
}

exports.updateUser = async (req,res) => {
    try
    {
        const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!userUpdated) return res.status(404).json({message:"User not found"});
        res.status(200).json({message:"User updated", user: userUpdated});
    }
    catch(erro)
    {
        res.status(404).json({message:"Some error updated user by this object"});
    }
}

exports.deleteUser = async (req,res) => {
    try
    {
        const deletedUser = await User.findByIdAndDelete(req.params.id,req.body, {new:true})
        if(!deletedUser) return res.status(404).json({message:"User not found"});
        res.status(200).json({message:"User deleted"});
    }
    catch(erro)
    {
        res.status(500).json({ message: "Error deleting user" });
    }
}