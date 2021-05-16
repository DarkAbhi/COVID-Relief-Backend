const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Ambulance Service Model
const AmbulanceServiceModel = require("../../models/AmbulanceServiceModel");

// @routes GET api/ambulance
// @desc GET all Ambulance Service
router.get("/", (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var size;
  if(req.query.pageNo != null) size = 10
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    return res.json({
      status: "error",
      error: "Invalid page number, should start with 1",
    });
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  // Find some documents
  AmbulanceServiceModel.countDocuments({}, function (err, totalCount) {
    if (err) {
      response = {
        status: "error",
        error: "Error fetching data",
      };
    }
    AmbulanceServiceModel.find({}, {}, query, function (err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = {
          status: "error",
          error: "Error fetching data",
        };
      } else {
        var totalPages = Math.ceil(totalCount / size);
        response = { status: "ok", data: data, pages: totalPages, size: data.length };
      }
      res.json(response);
    });
  });
});

// @routes POST api/ambulance
// @desc create a new Ambulance Service

router.post("/", async (req, res) => {
  const newAmbulance = new AmbulanceServiceModel(req.body);
  try {
    const ambulance = await newAmbulance.save();
    if (!ambulance)
      throw Error("An error occured while saving the Ambulance Service.");
    res.status(200).json(ambulance);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/ambulance/:id
// @desc deletes a Ambulance Service

router.delete("/:id", async (req, res) => {
  try {
    const ambulance = await AmbulanceServiceModel.findByIdAndDelete(
      req.params.id
    );
    if (!ambulance) throw Error("No ambulance service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/ambulance/:id
// @desc update a Ambulance Service

router.patch("/:id", async (req, res) => {
  try {
    const ambulance = await AmbulanceServiceModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!ambulance) throw Error("No ambulance service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/ambulance/:id
// @desc GET single Ambulance Service
router.get("/:id", async (req, res) => {
  try {
    const ambulance = await AmbulanceServiceModel.findById(req.params.id);
    if (!ambulance) throw Error("No item");
    res.status(200).json(ambulance);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
