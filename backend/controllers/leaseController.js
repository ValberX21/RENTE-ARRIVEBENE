const Lease = require("../models/Lease");

exports.createLease = async (req,res) => {
    try{
        const newLease = new Lease(req.body);
        await newLease.save();
        res.status(201).json({message:"Lease created"});

    }catch(error){
        res.status(500).json({message: "Erro on create lease", error})
    }
}