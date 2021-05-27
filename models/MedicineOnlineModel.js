const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicineOnlineSchema = new Schema(
  {
    online_pharmacy_name: {
      type: String,
    },
    contact_details: {
      type: String,
    },
    mode: {
      type: String,
    },
    links: {
      type: String,
    },
  },
  { collection: "medicines_delivery" }
);

module.exports = mongoose.model("MedicineOnline", MedicineOnlineSchema);
