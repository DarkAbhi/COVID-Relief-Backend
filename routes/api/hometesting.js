const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Home Test Service Model
const HomeTestingModel = require("../../models/HomeTestingModel");

// @routes GET api/homeTests
// @desc GET all Home Test Service
router.get("/", async (_req, res) => {
  try {
    const homeTests = await HomeTestingModel.find();
    if (!homeTests) throw Error("No items");
    res.status(200).json(homeTests);
  } catch (error) {
    res.status(400).json({ message: error });
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
