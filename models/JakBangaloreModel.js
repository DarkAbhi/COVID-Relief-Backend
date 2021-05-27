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
  },
  { collection: "jak_bangalore" }
);

module.exports = mongoose.model("JakBangaloreSchema", UserSchema);
