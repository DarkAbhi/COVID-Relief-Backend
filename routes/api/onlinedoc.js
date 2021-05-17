const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Online Doctor Service Model
const OnlineDoctorConsultationModel = require("../../models/OnlineDoctorConsultationModel");

// @routes GET api/doc
// @desc GET all Online Doctor Service
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
    OnlineDoctorConsultationModel.countDocuments({}, function (err, totalCount) {
      if (err) {
        response = {
          status: "error",
          error: "Error fetching data",
        };
      }
      OnlineDoctorConsultationModel.find({}, {}, query, function (err, data) {
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
    OnlineDoctorConsultationModel.countDocuments(
      { available: availability },
      function (err, totalCount) {
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        }
        OnlineDoctorConsultationModel.find(
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

// @routes POST api/doc
// @desc create a new Online Doctor Service

router.post("/", async (req, res) => {
  const newDoc = new OnlineDoctorConsultationModel(req.body);
  try {
    const doc = await newDoc.save();
    if (!doc)
      throw Error("An error occured while saving the Online Doctor Service.");
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/doc/:id
// @desc deletes a Online Doctor Service

router.delete("/:id", async (req, res) => {
  try {
    const doc = await OnlineDoctorConsultationModel.findByIdAndDelete(
      req.params.id
    );
    if (!doc) throw Error("No doc service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/doc/:id
// @desc update a Online Doctor Service

router.patch("/:id", async (req, res) => {
  try {
    const doc = await OnlineDoctorConsultationModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!doc) throw Error("No doc service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/doc/:id
// @desc GET single Online Doctor Service
router.get("/:id", async (req, res) => {
    try {
      const doc = await OnlineDoctorConsultationModel.findById(req.params.id);
      if (!doc) throw Error("No item");
      res.status(200).json(doc);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
