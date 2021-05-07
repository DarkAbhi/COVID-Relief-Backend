const express = require("express");

const router = express.Router();

// Ambulance Service Model
const AmbulanceServiceModel = require("../../models/AmbulanceServiceModel");

// @routes GET api/ambulance
// @desc GET all Ambulance Service
router.get("/", async (_req, res) => {
  try {
    const ambulances = await AmbulanceServiceModel.find();
    if (!ambulances) throw Error("No items");
    res.status(200).json(ambulances);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes POST api/ambulance
// @desc create a new Ambulance Service

router.post("/", async (req, res) => {
  const newAmbulance = new AmbulanceServiceModel(req.body);
  try {
    const ambulance = await newAmbulance.save();
    if (!ambulance)
      throw Error("An error occured while saving the Ambulance Service.");
    res.status(200).json(ambulance);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/ambulance/:id
// @desc deletes a Ambulance Service

router.delete("/:id", async (req, res) => {
  try {
    const ambulance = await AmbulanceServiceModel.findByIdAndDelete(
      req.params.id
    );
    if (!ambulance) throw Error("No ambulance service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/ambulance/:id
// @desc update a Ambulance Service

router.patch("/:id", async (req, res) => {
  try {
    const ambulance = await AmbulanceServiceModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!ambulance) throw Error("No ambulance service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/ambulance/:id
// @desc GET single Ambulance Service
router.get("/:id", async (req, res) => {
    try {
      const ambulance = await AmbulanceServiceModel.findById(req.params.id);
      if (!ambulance) throw Error("No item");
      res.status(200).json(ambulance);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
