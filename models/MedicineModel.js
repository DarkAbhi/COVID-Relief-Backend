const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
  available: {
    type: Boolean,
    default: false,
  },
  // This can be no stock, black market, purchase, waiting period, rental
  condition: {
    type: String,
    required: true,
  },
  contact_email: {
    type: String,
  },
  contact_name: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: ""
  },
  last_update_time: {
    type: Date,
    default: Date.now,
  },
  link_to_go: {
    type: String,
    default: ""
  },
  location_covered: {
    type: String,
    default: ""
  },
  medicine_name: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ""
  },
  price: {
    type: String,
    required: true
  },
  source: {
    type: String,
    default: ""
  },
  timings: {
    type: String,
    default: ""
  },
  // This can be tablet or syrup
  type: {
    type: String,
    required: true,
  },
  verified: {
    type: String,
    required:true
  },
  verified_by: {
    type: String,
    default: ""
  },
});

module.exports = mongoose.model("Medicine", MedicineSchema);
