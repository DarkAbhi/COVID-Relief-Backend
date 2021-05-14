const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OxygenSchema = new Schema({
  available: {
    type: Boolean,
    default: false,
  },
  capacity: {
    type: String,
    required: true,
  },
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
    default: "",
  },
  last_update_time: {
    type: Date,
    default: Date.now,
  },
  link_to_go: {
    type: String,
    default: "",
  },
  location_covered: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  price: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    default: "",
  },
  timings: {
    type: String,
    default: "",
  },
  // This can be cylinder, concentrator or both
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
    default: "",
  },
});

module.exports = mongoose.model("Oxygen", OxygenSchema);
