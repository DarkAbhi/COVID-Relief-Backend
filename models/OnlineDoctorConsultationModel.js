const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OnlineDocSchema = new Schema({
  available: {
    type: Boolean,
    default: false,
  },
  charges: {
    type: String
  },
  contact_email: {
    type: String,
  },
  contact_name: {
    type: String
  },
  contact_number: {
    type: String
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
  // This can be online or home
  type: {
    type: String
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

module.exports = mongoose.model("OnlineDoctor", OnlineDocSchema);
