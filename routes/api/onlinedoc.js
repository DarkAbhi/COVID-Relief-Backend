const express = require("express");

const router = express.Router();

// Online Doctor Service Model
const OnlineDoctorConsultationModel = require("../../models/OnlineDoctorConsultationModel");

// @routes GET api/doc
// @desc GET all Online Doctor Service
router.get("/", async (_req, res) => {
  try {
    const docs = await OnlineDoctorConsultationModel.find();
    if (!docs) throw Error("No items");
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes POST api/doc
// @desc create a new Online Doctor Service

router.post("/", async (req, res) => {
  const newDoc = new OnlineDoctorConsultationModel(req.body);
  try {
    const doc = await newDoc.save();
    if (!doc)
      throw Error("An error occured while saving the Online Doctor Service.");
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/doc/:id
// @desc deletes a Online Doctor Service

router.delete("/:id", async (req, res) => {
  try {
    const doc = await OnlineDoctorConsultationModel.findByIdAndDelete(
      req.params.id
    );
    if (!doc) throw Error("No doc service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/doc/:id
// @desc update a Online Doctor Service

router.patch("/:id", async (req, res) => {
  try {
    const doc = await OnlineDoctorConsultationModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!doc) throw Error("No doc service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/doc/:id
// @desc GET single Online Doctor Service
router.get("/:id", async (req, res) => {
    try {
      const doc = await OnlineDoctorConsultationModel.findById(req.params.id);
      if (!doc) throw Error("No item");
      res.status(200).json(doc);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
