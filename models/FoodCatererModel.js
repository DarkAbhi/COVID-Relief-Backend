const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodCatererModelSchema = new Schema({
  org_name: {
    type: String,
  },
  contact_details: {
    type: String,
    required: true,
  },
  stay_location: {
    type: String,
    required: true,
  },

  //0 -> food donor, 1-> food provider, 2 -> ration donor, 3 -> other
  you_are: {
    type: String,
    required: true,
  },
  type_of_food: {
    type: String,
  },
  ration_kit_items: {
    type: String,
  },
  price_ranges: {
    type: String,
  },
  kits: {
    type: String,
    required: true,
  },
  you_serve: [{
    type: String,
  }],
  locations: {
    type: String,
    required:true
  },
  duration: {
    type: Date,
    default: Date.now,
  },
  timings: {
    type: String,
    required: true,
  },
  
  //0 -> yes, 1-> no, 2 -> maybe
  prior_notice: {
    type: String,
    required: true,
  },

  //0 -> own, 1-> arranged by the needful, 2 -> other
  transportation_status: {
    type: String,
    required: true,
  },
  additional_note: {
    type: String,
  },
});

module.exports = mongoose.model("FoodCaterer", FoodCatererModelSchema);