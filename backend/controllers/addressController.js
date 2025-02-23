const Address = require("../models/Address");

exports.createAddress = async (req,res) => {
    try{
        const newAddress = new Address(req.body);
        await newAddress.save();
        res.status(201).json({message:"Address created"})
    }
    catch(error){
        res.status(500).json({message: "Erro creating address", error})
    }
}

exports.getAllAddress = async (req,res) => {

    try
    {
        const address = await Address.find().sort({createdAt:-1});
        res.status(200).json(address);
    }
    catch(erro)
    {
        res.status(500).json({message:"Some error listing address"});
    }
}

exports.getAddressById = async (req,res) => {
    try
    {
        const address = await Address.findById(req.params.id);
        if(!address) return res.status(404).json({message:"address not found"});
        res.json(address);
    }
    catch(erro)
    {
        res.status(404).json({message:"Some error find address by this ID"});
    }
}

exports.updateAddress = async (req,res) => {
    try
    {
        const addressUpdated = await Address.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!addressUpdated) return res.status(404).json({message:"Address not found"});
        res.status(200).json({message:"Address updated", user: addressUpdated});
    }
    catch(erro)
    {
        res.status(404).json({message:"Some error updated address by this object"});
    }
}

exports.deleteAddress = async (req,res) => {
    try
    {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id,req.body, {new:true})
        if(!deletedAddress) return res.status(404).json({message:"Address not found"});
        res.status(200).json({message:"Address deleted"});
    }
    catch(erro)
    {
        res.status(500).json({ message: "Error deleting address" });
    }
}