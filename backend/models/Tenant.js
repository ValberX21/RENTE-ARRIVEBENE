const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
    cpf: {type:Number, required:true, unique:true, length:11},
    name: { type: String },
    email: { type: String, unique: true },
    phone: { type: String, required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    rentAmount: { type: Number },
    rentDueDate: { type: Date }, 
    matrialStatus: {type: String,
         enum: ['Single',
                'Married',
                'Divorced',
                'Widowed',
                'Separated',
                'Engaged',
                'In a relationship'],
            default:'Single'
            },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Tenant", tenantSchema);
