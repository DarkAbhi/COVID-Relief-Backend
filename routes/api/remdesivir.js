const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Remdesivir Service Model
const RemdesivirModel = require("../../models/RemdesivirModel");

// @routes GET api/remdesivir
// @desc GET all Remdesivir Service
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
    RemdesivirModel.countDocuments({}, function (err, totalCount) {
      if (err) {
        response = {
          status: "error",
          error: "Error fetching data",
        };
      }
      RemdesivirModel.find({}, {}, query, function (err, data) {
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
    RemdesivirModel.countDocuments(
      { available: availability },
      function (err, totalCount) {
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        }
        RemdesivirModel.find(
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

// @routes POST api/remdesivir
// @desc create a new Remdesivir Service

router.post("/", async (req, res) => {
  const newRemdesivir = new RemdesivirModel(req.body);
  try {
    const remdesivir = await newRemdesivir.save();
    if (!remdesivir)
      throw Error("An error occured while saving the Remdesivir Service.");
    res.status(200).json(remdesivir);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/remdesivir/:id
// @desc deletes a Remdesivir Service

router.delete("/:id", async (req, res) => {
  try {
    const remdesivir = await RemdesivirModel.findByIdAndDelete(
      req.params.id
    );
    if (!remdesivir) throw Error("No remdesivir service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/remdesivir/:id
// @desc update a Remdesivir Service

router.patch("/:id", async (req, res) => {
  try {
    const remdesivir = await RemdesivirModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!remdesivir) throw Error("No remdesivir service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/remdesivir/:id
// @desc GET single Remdesivir Service
router.get("/:id", async (req, res) => {
    try {
      const remdesivir = await RemdesivirModel.findById(req.params.id);
      if (!remdesivir) throw Error("No item");
      res.status(200).json(remdesivir);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
