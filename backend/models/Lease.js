const mongoose = require("mongoose");

const leaseSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    rentAmount: { type: Number, required: true },
    status: { type: String, enum: ["active", "expired", "terminated"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Lease", leaseSchema);
