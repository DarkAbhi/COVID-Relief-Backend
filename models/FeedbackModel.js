const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
