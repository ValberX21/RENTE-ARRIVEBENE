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

exports.getAllTenants = async (req,res) => {
    try
    {
        const tenants = await Tenant.find();
        res.status(200).json(tenants);
    }
    catch(erro)
    {
        res.status(500).json({message:"Some error tenant users"});
    }
}

exports.getTenantById = async (req,res) => {
    try
    {
        const tenantDt = await Tenant.findById(req.params.id);
        if(!tenantDt) return res.status(404).json({message:"Tenant not found"});
        res.json(tenantDt);
    }
    catch(erro)
    {
        res.status(404).json({message:"Some error find tenant by this ID"});
    }
}

exports.updateTenant = async (req,res) => {
    try
    {
        const tenantUpdated = await Tenant.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!tenantUpdated) return res.status(404).json({message:"Tenant not found"});
        res.status(200).json({message:"Tenant updated", user: tenantUpdated});
    }
    catch(erro)
    {
        res.status(404).json({message:"Some error updated tenant by this object"});
    }
}

exports.deleteTenant = async (req,res) => {
    try
    {
        const deletedUser = await Tenant.findByIdAndDelete(req.params.id,req.body, {new:true})
        if(!deletedUser) return res.status(404).json({message:"Tenant not found"});
        res.status(200).json({message:"Tenant deleted"});
    }
    catch(erro)
    {
        res.status(500).json({ message: "Error deleting tenant" });
    }
}