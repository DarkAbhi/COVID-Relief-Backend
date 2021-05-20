const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Home Test Service Model
const FeedbackModel = require("../../models/FeedbackModel");

router.post("/", async (req, res) => {
  const feedback = new FeedbackModel(req.body);
  try {
    const feedbackResult = await feedback.save();
    if (!feedbackResult)
      throw Error("An error occured while saving the Home Test Service.");
    res.status(200).json(feedbackResult);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
