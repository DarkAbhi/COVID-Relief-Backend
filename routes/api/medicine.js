const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Medicine Service Model
const MedicineModel = require("../../models/MedicineModel");

// @routes GET api/medicine
// @desc GET all Medicine Service
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
    MedicineModel.countDocuments({}, function (err, totalCount) {
      if (err) {
        response = {
          status: "error",
          error: "Error fetching data",
        };
      }
      MedicineModel.find({}, {}, query, function (err, data) {
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
    MedicineModel.countDocuments(
      { available: availability },
      function (err, totalCount) {
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        }
        MedicineModel.find(
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

// @routes POST api/medicine
// @desc create a new Medicine Service

router.post("/", async (req, res) => {
  const newMedicine = new MedicineModel(req.body);
  try {
    const medicine = await newMedicine.save();
    if (!medicine)
      throw Error("An error occured while saving the Medicine Service.");
    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/medicine/:id
// @desc deletes a Medicine Service

router.delete("/:id", async (req, res) => {
  try {
    const medicine = await MedicineModel.findByIdAndDelete(
      req.params.id
    );
    if (!medicine) throw Error("No medicine service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/medicine/:id
// @desc update a Medicine Service

router.patch("/:id", async (req, res) => {
  try {
    const medicine = await MedicineModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!medicine) throw Error("No medicine service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/medicine/:id
// @desc GET single Medicine Service
router.get("/:id", async (req, res) => {
    try {
      const medicine = await MedicineModel.findById(req.params.id);
      if (!medicine) throw Error("No item");
      res.status(200).json(medicine);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
