const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Tele Counselling Service Model
const TeleCounsellingModel = require("../../models/TeleCounsellingModel");

// @routes GET api/teleCounsellor
// @desc GET all Tele Counselling Service
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
    TeleCounsellingModel.countDocuments({}, function (err, totalCount) {
      if (err) {
        response = {
          status: "error",
          error: "Error fetching data",
        };
      }
      TeleCounsellingModel.find({}, {}, query, function (err, data) {
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
    TeleCounsellingModel.countDocuments(
      { available: availability },
      function (err, totalCount) {
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        }
        TeleCounsellingModel.find(
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

// @routes POST api/teleCounsellor
// @desc create a new Tele Counselling Service

router.post("/", async (req, res) => {
  const newTeleCounsellors = new TeleCounsellingModel(req.body);
  try {
    const teleCounsellor = await newTeleCounsellors.save();
    if (!teleCounsellor)
      throw Error("An error occured while saving the Tele Counselling Service.");
    res.status(200).json(teleCounsellor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/teleCounsellor/:id
// @desc deletes a Tele Counselling Service

router.delete("/:id", async (req, res) => {
  try {
    const teleCounsellor = await TeleCounsellingModel.findByIdAndDelete(
      req.params.id
    );
    if (!teleCounsellor) throw Error("No teleCounsellor service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/teleCounsellor/:id
// @desc update a Tele Counselling Service

router.patch("/:id", async (req, res) => {
  try {
    const teleCounsellor = await TeleCounsellingModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!teleCounsellor) throw Error("No teleCounsellor service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/teleCounsellor/:id
// @desc GET single Tele Counselling Service
router.get("/:id", async (req, res) => {
    try {
      const teleCounsellor = await TeleCounsellingModel.findById(req.params.id);
      if (!teleCounsellor) throw Error("No item");
      res.status(200).json(teleCounsellor);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
