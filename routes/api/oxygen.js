const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Oxygen Service Model
const OxygenModel = require("../../models/OxygenModel");

// @routes GET api/oxygen
// @desc GET all Oxygen Service
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
    OxygenModel.countDocuments({}, function (err, totalCount) {
      if (err) {
        response = {
          status: "error",
          error: "Error fetching data",
        };
      }
      OxygenModel.find({}, {}, query, function (err, data) {
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
    OxygenModel.countDocuments(
      { available: availability },
      function (err, totalCount) {
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        }
        OxygenModel.find(
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

// @routes POST api/oxygen
// @desc create a new Oxygen Service

router.post("/", async (req, res) => {
  const newOxygen = new OxygenModel(req.body);
  try {
    const oxygen = await newOxygen.save();
    if (!oxygen)
      throw Error("An error occured while saving the Oxygen Service.");
    res.status(200).json(oxygen);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/oxygen/:id
// @desc deletes a Oxygen Service

router.delete("/:id", async (req, res) => {
  try {
    const oxygen = await OxygenModel.findByIdAndDelete(
      req.params.id
    );
    if (!oxygen) throw Error("No oxygen service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/oxygen/:id
// @desc update a Oxygen Service

router.patch("/:id", async (req, res) => {
  try {
    const oxygen = await OxygenModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!oxygen) throw Error("No oxygen service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/oxygen/:id
// @desc GET single Oxygen Service
router.get("/:id", async (req, res) => {
    try {
      const oxygen = await OxygenModel.findById(req.params.id);
      if (!oxygen) throw Error("No item");
      res.status(200).json(oxygen);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
