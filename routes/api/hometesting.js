const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Home Test Service Model
const HomeTestingModel = require("../../models/HomeTestingModel");

// @routes GET api/homeTests
// @desc GET all Home Test Service
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
    HomeTestingModel.countDocuments({}, function (err, totalCount) {
      if (err) {
        response = {
          status: "error",
          error: "Error fetching data",
        };
      }
      HomeTestingModel.find({}, {}, query, function (err, data) {
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
    HomeTestingModel.countDocuments(
      { available: availability },
      function (err, totalCount) {
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        }
        HomeTestingModel.find(
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

// @routes POST api/homeTests
// @desc create a new Home Test Service

router.post("/", async (req, res) => {
  const newHomeTests = new HomeTestingModel(req.body);
  try {
    const homeTests = await newHomeTests.save();
    if (!homeTests)
      throw Error("An error occured while saving the Home Test Service.");
    res.status(200).json(homeTests);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/homeTests/:id
// @desc deletes a Home Test Service

router.delete("/:id", async (req, res) => {
  try {
    const homeTests = await HomeTestingModel.findByIdAndDelete(
      req.params.id
    );
    if (!homeTests) throw Error("No homeTests service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/homeTests/:id
// @desc update a Home Test Service

router.patch("/:id", async (req, res) => {
  try {
    const homeTests = await HomeTestingModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!homeTests) throw Error("No homeTests service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/homeTests/:id
// @desc GET single Home Test Service
router.get("/:id", async (req, res) => {
    try {
      const homeTests = await HomeTestingModel.findById(req.params.id);
      if (!homeTests) throw Error("No item");
      res.status(200).json(homeTests);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
