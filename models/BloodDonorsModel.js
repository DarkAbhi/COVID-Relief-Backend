const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BloodDonorsSchema = new Schema({
  available: {
    type: Boolean,
    default: false,
  },
  blood_group: {
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
  source: {
    type: String,
    default: "",
  },
  timings: {
    type: String,
    default: "",
  },
  // This can be platform, indiviual or blood banks
  type: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verified_by: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("BloodDonors", BloodDonorsSchema);
