const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  available: {
    type: Boolean,
    default: false,
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
  name: {
    type: String,
    default: ""
  },
  source: {
    type: String,
    default: ""
  },
  timings: {
    type: String,
    default: ""
  },
  // This can be home chef, NGO or others
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

module.exports = mongoose.model("Food", FoodSchema);
