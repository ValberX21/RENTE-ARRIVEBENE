const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true, default: 'Brazil' },
  zipCode: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Address', AddressSchema);
