const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Bed Service Model
const BloodDonorsModel = require("../../models/BloodDonorsModel");

// @routes GET api/blood_donor
// @desc GET all Bed Service
router.get("/", (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var availability = req.query.availability;
  var size = parseInt(req.query.size);
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
  if (availability == null) {
    BloodDonorsModel.countDocuments({}, function (err, totalCount) {
      if (err) {
        response = {
          status: "error",
          error: "Error fetching data",
        };
      }
      BloodDonorsModel.find({}, {}, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        } else {
          var totalPages = Math.ceil(totalCount / size);
          response = {
            status: "ok",
            data: data,
            pages: totalPages,
            size: data.length,
          };
        }
        res.json(response);
      });
    });
  } else {
    BloodDonorsModel.countDocuments(
      { available: availability },
      function (err, totalCount) {
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        }
        BloodDonorsModel.find(
          { available: availability },
          {},
          query,
          function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
              response = {
                status: "error",
                error: "Error fetching data",
              };
            } else {
              var totalPages = Math.ceil(totalCount / size);
              response = {
                status: "ok",
                data: data,
                pages: totalPages,
                size: data.length,
              };
            }
            res.json(response);
          }
        );
      }
    );
  }
});

// @routes POST api/blood_donor
// @desc create a new Bed Service

router.post("/", async (req, res) => {
  const newBloodDonor = new BloodDonorsModel(req.body);
  try {
    const blood_donor = await newBloodDonor.save();
    if (!blood_donor)
      throw Error("An error occured while saving the Bed Service.");
    res.status(200).json(blood_donor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/blood_donor/:id
// @desc deletes a Bed Service

router.delete("/:id", async (req, res) => {
  try {
    const blood_donor = await BloodDonorsModel.findByIdAndDelete(
      req.params.id
    );
    if (!blood_donor) throw Error("No blood_donor service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/blood_donor/:id
// @desc update a Bed Service

router.patch("/:id", async (req, res) => {
  try {
    const blood_donor = await BloodDonorsModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!blood_donor) throw Error("No blood_donor service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/blood_donor/:id
// @desc GET single Bed Service
router.get("/:id", async (req, res) => {
    try {
      const blood_donor = await BloodDonorsModel.findById(req.params.id);
      if (!blood_donor) throw Error("No item");
      res.status(200).json(blood_donor);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
