const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["paid", "pending", "late"], default: "pending" },
    lateFee: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
