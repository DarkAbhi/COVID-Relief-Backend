const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Oxygen Service Model
const OxygenModel = require("../../models/OxygenModel");

// @routes GET api/oxygen
// @desc GET all Oxygen Service
router.get("/", async (_req, res) => {
  try {
    const oxygens = await OxygenModel.find();
    if (!oxygens) throw Error("No items");
    res.status(200).json(oxygens);
  } catch (error) {
    res.status(400).json({ message: error });
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
