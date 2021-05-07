const express = require("express");

const router = express.Router();

// Donor Service Model
const NeravuPlasmaModel = require("../../models/NeravuPlasmaModel");

// @routes GET api/donor
// @desc GET all Donor Service
router.get("/", async (_req, res) => {
  try {
    const donors = await NeravuPlasmaModel.find();
    if (!donors) throw Error("No items");
    res.status(200).json(donors);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes POST api/donor
// @desc create a new Donor Service

router.post("/", async (req, res) => {
  const newDonor = new NeravuPlasmaModel(req.body);
  try {
    const donor = await newDonor.save();
    if (!donor)
      throw Error("An error occured while saving the Donor data.");
    res.status(200).json(donor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/donor/:id
// @desc GET single Donor Service
router.get("/:id", async (req, res) => {
    try {
      const donor = await NeravuPlasmaModel.findById(req.params.id);
      if (!donor) throw Error("No item");
      res.status(200).json(donor);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
