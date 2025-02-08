const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    propertyType: { type: String,  enum: ["Apartment","Office","House"], default:"House", required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model("Property", propertySchema);
