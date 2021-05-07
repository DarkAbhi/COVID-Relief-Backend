const express = require("express");

const router = express.Router();

// Food Service Model
const FoodModel = require("../../models/FoodModel");

// @routes GET api/food
// @desc GET all Food Service
router.get("/", async (_req, res) => {
  try {
    const foods = await FoodModel.find();
    if (!foods) throw Error("No items");
    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes POST api/food
// @desc create a new Food Service

router.post("/", async (req, res) => {
  const newFood = new FoodModel(req.body);
  try {
    const food = await newFood.save();
    if (!food)
      throw Error("An error occured while saving the Food Service.");
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/food/:id
// @desc deletes a Food Service

router.delete("/:id", async (req, res) => {
  try {
    const food = await FoodModel.findByIdAndDelete(
      req.params.id
    );
    if (!food) throw Error("No food service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/food/:id
// @desc update a Food Service

router.patch("/:id", async (req, res) => {
  try {
    const food = await FoodModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!food) throw Error("No food service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/food/:id
// @desc GET single Food Service
router.get("/:id", async (req, res) => {
    try {
      const food = await FoodModel.findById(req.params.id);
      if (!food) throw Error("No item");
      res.status(200).json(food);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
