const express = require("express");

const router = express.Router();

// Medicine Service Model
const MedicineModel = require("../../models/MedicineModel");

// @routes GET api/medicine
// @desc GET all Medicine Service
router.get("/", async (_req, res) => {
  try {
    const medicines = await MedicineModel.find();
    if (!medicines) throw Error("No items");
    res.status(200).json(medicines);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes POST api/medicine
// @desc create a new Medicine Service

router.post("/", async (req, res) => {
  const newMedicine = new MedicineModel(req.body);
  try {
    const medicine = await newMedicine.save();
    if (!medicine)
      throw Error("An error occured while saving the Medicine Service.");
    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/medicine/:id
// @desc deletes a Medicine Service

router.delete("/:id", async (req, res) => {
  try {
    const medicine = await MedicineModel.findByIdAndDelete(
      req.params.id
    );
    if (!medicine) throw Error("No medicine service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/medicine/:id
// @desc update a Medicine Service

router.patch("/:id", async (req, res) => {
  try {
    const medicine = await MedicineModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!medicine) throw Error("No medicine service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/medicine/:id
// @desc GET single Medicine Service
router.get("/:id", async (req, res) => {
    try {
      const medicine = await MedicineModel.findById(req.params.id);
      if (!medicine) throw Error("No item");
      res.status(200).json(medicine);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
