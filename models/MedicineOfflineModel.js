const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicineBangaloreSchema = new Schema(
  {
    pharmacy_name: {
      type: String,
    },
    contact_details: {
      type: String,
    },
    timings: {
      type: String,
    },
    location: {
      type: String,
    },
    location_link: {
      type: String,
    },
  },
  { collection: "medicines_bangalore" }
);

module.exports = mongoose.model("MedicineBangalore", MedicineBangaloreSchema);
