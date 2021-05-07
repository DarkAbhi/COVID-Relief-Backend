const express = require("express");

const router = express.Router();

// Tele Counselling Service Model
const TeleCounsellingModel = require("../../models/TeleCounsellingModel");

// @routes GET api/teleCounsellor
// @desc GET all Tele Counselling Service
router.get("/", async (_req, res) => {
  try {
    const teleCounsellors = await TeleCounsellingModel.find();
    if (!teleCounsellors) throw Error("No items");
    res.status(200).json(teleCounsellors);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes POST api/teleCounsellor
// @desc create a new Tele Counselling Service

router.post("/", async (req, res) => {
  const newTeleCounsellors = new TeleCounsellingModel(req.body);
  try {
    const teleCounsellor = await newTeleCounsellors.save();
    if (!teleCounsellor)
      throw Error("An error occured while saving the Tele Counselling Service.");
    res.status(200).json(teleCounsellor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/teleCounsellor/:id
// @desc deletes a Tele Counselling Service

router.delete("/:id", async (req, res) => {
  try {
    const teleCounsellor = await TeleCounsellingModel.findByIdAndDelete(
      req.params.id
    );
    if (!teleCounsellor) throw Error("No teleCounsellor service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/teleCounsellor/:id
// @desc update a Tele Counselling Service

router.patch("/:id", async (req, res) => {
  try {
    const teleCounsellor = await TeleCounsellingModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!teleCounsellor) throw Error("No teleCounsellor service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/teleCounsellor/:id
// @desc GET single Tele Counselling Service
router.get("/:id", async (req, res) => {
    try {
      const teleCounsellor = await TeleCounsellingModel.findById(req.params.id);
      if (!teleCounsellor) throw Error("No item");
      res.status(200).json(teleCounsellor);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
