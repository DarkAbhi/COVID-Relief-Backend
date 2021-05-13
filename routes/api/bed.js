const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Bed Service Model
const BedAvailabilityModel = require("../../models/BedAvailabilityModel");

// @routes GET api/bed
// @desc GET all Bed Service
router.get("/", async (_req, res) => {
  try {
    const beds = await BedAvailabilityModel.find();
    if (!beds) throw Error("No items");
    res.status(200).json(beds);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes POST api/bed
// @desc create a new Bed Service

router.post("/", async (req, res) => {
  const newBed = new BedAvailabilityModel(req.body);
  try {
    const bed = await newBed.save();
    if (!bed)
      throw Error("An error occured while saving the Bed Service.");
    res.status(200).json(bed);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/bed/:id
// @desc deletes a Bed Service

router.delete("/:id", async (req, res) => {
  try {
    const bed = await BedAvailabilityModel.findByIdAndDelete(
      req.params.id
    );
    if (!bed) throw Error("No bed service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/bed/:id
// @desc update a Bed Service

router.patch("/:id", async (req, res) => {
  try {
    const bed = await BedAvailabilityModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!bed) throw Error("No bed service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/bed/:id
// @desc GET single Bed Service
router.get("/:id", async (req, res) => {
    try {
      const bed = await BedAvailabilityModel.findById(req.params.id);
      if (!bed) throw Error("No item");
      res.status(200).json(bed);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
