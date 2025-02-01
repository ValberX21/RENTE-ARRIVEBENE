const Tenant = require("../models/Tenant");

exports.createTenant = async (req, res) => {
    try{
        const newTenant = new Tenant(req.body);
        await newTenant.save();
        res.status(201).json({message:"Tenant created"})
    }catch(error){
        res.status(500).json({message: "Erro creating tenant", error})
    }
}