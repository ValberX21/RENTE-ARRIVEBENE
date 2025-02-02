const Payment = require("../models/Payment");

exports.createPayment = async (req,res) => {
    try{
        const newPayment = new Payment(req.body);
        await newPayment.save();
        res.status(201).json({message:"Payment done"});
    }
    catch(erro)
    {
        res.status(500).json({message:"Erro in payment"});
    }
}

exports.getAllPayments = async (req,res) => {
    try
    {
        const payment = await Payment.find();
        res.status(200).json(payment);
    }
    catch(erro)
    {
        res.status(500).json({message:"Some error listing Payment"});
    }
}

exports.getPaymentById = async (req,res) => {
    try
    {
        const paymentDt = await Payment.findById(req.params.id);
        if(!paymentDt) return res.status(404).json({message:"Payment not found"});
        res.json(paymentDt);
    }
    catch(erro)
    {
        res.status(404).json({message:"Some error find payment by this ID"});
    }
}

exports.updatePayment = async (req,res) => {
    try
    {
        const paymentUpdated = await Payment.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!paymentUpdated) return res.status(404).json({message:"Payment not found"});
        res.status(200).json({message:"Payment updated", user: paymentUpdated});
    }
    catch(erro)
    {
        res.status(404).json({message:"Some error updated payment by this object"});
    }
}

exports.deletePayment = async (req,res) => {
    try
    {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id,req.body, {new:true})
        if(!deletedPayment) return res.status(404).json({message:"Payment not found"});
        res.status(200).json({message:"Payment deleted"});
    }
    catch(erro)
    {
        res.status(500).json({ message: "Error deleting payment" });
    }
}