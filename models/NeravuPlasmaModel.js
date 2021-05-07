const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NeravuPlasmaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  bloodgroup: {
    type: String,
    required: true
  },
  dateofrecovery: {
    type: Date,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  vaccinated: {
    type: Boolean,
    required: true
  },
  vaccinateddate: {
    type: Date,
    required: true
  },
  timestamp: {
    type: String,
    default: Date.now
  },
});

module.exports = mongoose.model("NeravuPlasma", NeravuPlasmaSchema);
