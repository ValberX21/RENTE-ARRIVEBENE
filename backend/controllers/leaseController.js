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

exports.getAllLeases = async (req,res) => {
    try
    {
        const users = await Lease.find();
        res.status(200).json(users);
    }
    catch(erro)
    {
        res.status(500).json({message:"Some error listing Lease"});
    }
}

exports.getLeaseById = async (req,res) => {
    try
    {
        const leaseDt = await Lease.findById(req.params.id);
        if(!leaseDt) return res.status(404).json({message:"Lease not found"});
        res.json(leaseDt);
    }
    catch(erro)
    {
        res.status(404).json({message:"Some error find lease by this ID"});
    }
}

exports.updateLease = async (req,res) => {
    try
    {
        const leaseUpdated = await Lease.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!leaseUpdated) return res.status(404).json({message:"Lease not found"});
        res.status(200).json({message:"Lease updated", user: leaseUpdated});
    }
    catch(erro)
    {
        res.status(404).json({message:"Some error updated user by this object"});
    }
}

exports.deleteLease = async (req,res) => {
    try
    {
        const leaseUser = await Lease.findByIdAndDelete(req.params.id,req.body, {new:true})
        if(!leaseUser) return res.status(404).json({message:"Lease not found"});
        res.status(200).json({message:"Lease deleted"});
    }
    catch(erro)
    {
        res.status(500).json({ message: "Error deleting lease" });
    }
}