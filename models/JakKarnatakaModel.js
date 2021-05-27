const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    kendra_code: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      unique: true,
    },
  },
  { collection: "jak_karnataka" }
);

module.exports = mongoose.model("JakKarnatakaSchema", UserSchema);
