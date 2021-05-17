const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Food Service Model
const FoodModel = require("../../models/FoodModel");

// @routes GET api/food
// @desc GET all Food Service
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
    FoodModel.countDocuments({}, function (err, totalCount) {
      if (err) {
        response = {
          status: "error",
          error: "Error fetching data",
        };
      }
      FoodModel.find({}, {}, query, function (err, data) {
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
    FoodModel.countDocuments(
      { available: availability },
      function (err, totalCount) {
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        }
        FoodModel.find(
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

// @routes POST api/food
// @desc create a new Food Service

router.post("/", async (req, res) => {
  const newFood = new FoodModel(req.body);
  try {
    const food = await newFood.save();
    if (!food)
      throw Error("An error occured while saving the Food Service.");
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/food/:id
// @desc deletes a Food Service

router.delete("/:id", async (req, res) => {
  try {
    const food = await FoodModel.findByIdAndDelete(
      req.params.id
    );
    if (!food) throw Error("No food service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/food/:id
// @desc update a Food Service

router.patch("/:id", async (req, res) => {
  try {
    const food = await FoodModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!food) throw Error("No food service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/food/:id
// @desc GET single Food Service
router.get("/:id", async (req, res) => {
    try {
      const food = await FoodModel.findById(req.params.id);
      if (!food) throw Error("No item");
      res.status(200).json(food);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
