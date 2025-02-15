const mongoose = require("mongoose");

const leaseSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    rentAmount: { type: Number, required: true },
    status: { type: String, enum: ["active", "expired", "terminated"], default: "active" },
    guarant: { type: String, enum: ['No guarantee','Deposit (1,2,3)','Surety bond','Guarantor']},
    adjustmentDate:{ 
        type: Date,
        default: () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1); // Adiciona 1 ano
        date.setHours(0, 0, 0, 0); // Remove horas, minutos, segundos e milissegundos
        return date;
    },},
}, { timestamps: true });

module.exports = mongoose.model("Lease", leaseSchema);
