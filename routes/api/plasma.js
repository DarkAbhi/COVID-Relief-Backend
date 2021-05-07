const express = require("express");

const router = express.Router();

// Plasma Donor Service Model
const PlasmaDonorsModel = require("../../models/PlasmaDonorsModel");

// @routes GET api/plasmaDonor
// @desc GET all Plasma Donor Service
router.get("/", async (_req, res) => {
  try {
    const plasmaDonors = await PlasmaDonorsModel.find();
    if (!plasmaDonors) throw Error("No items");
    res.status(200).json(plasmaDonors);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes POST api/plasmaDonor
// @desc create a new Plasma Donor Service

router.post("/", async (req, res) => {
  const newPlasma = new PlasmaDonorsModel(req.body);
  try {
    const plasmaDonor = await newPlasma.save();
    if (!plasmaDonor)
      throw Error("An error occured while saving the Plasma Donor Service.");
    res.status(200).json(plasmaDonor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/plasmaDonor/:id
// @desc deletes a Plasma Donor Service

router.delete("/:id", async (req, res) => {
  try {
    const plasmaDonor = await PlasmaDonorsModel.findByIdAndDelete(
      req.params.id
    );
    if (!plasmaDonor) throw Error("No plasmaDonor service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/plasmaDonor/:id
// @desc update a Plasma Donor Service

router.patch("/:id", async (req, res) => {
  try {
    const plasmaDonor = await PlasmaDonorsModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!plasmaDonor) throw Error("No plasmaDonor service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/plasmaDonor/:id
// @desc GET single Plasma Donor Service
router.get("/:id", async (req, res) => {
    try {
      const plasmaDonor = await PlasmaDonorsModel.findById(req.params.id);
      if (!plasmaDonor) throw Error("No item");
      res.status(200).json(plasmaDonor);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
