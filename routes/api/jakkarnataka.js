const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Ambulance Service Model
const JakKarnatakaModel = require("../../models/JakKarnatakaModel");

// @routes GET api/ambulance
// @desc GET all Ambulance Service
router.get("/", (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
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
  JakKarnatakaModel.countDocuments({}, function (err, totalCount) {
    if (err) {
      response = {
        status: "error",
        error: "Error fetching data",
      };
    }
    JakKarnatakaModel.find({}, {}, query, function (err, data) {
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
});


module.exports = router;
