const express = require("express");
const cors = require("cors");

const router = express.Router();
const { JWT_SECRET } = require("../../config");

router.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Model
const UserModel = require("../../models/UserModel");

// @routes POST api/register
// @desc POST user register
router.post("/", async (req, res) => {
  const { email, password: plainPassword } = req.body;

  if (!email || typeof email !== "string")
    return res.status(200).json({
      status: "error",
      error: "Invalid Email-ID",
    });

  if (!plainPassword || typeof plainPassword !== "string")
    return res.status(200).json({
      status: "error",
      error: "Invalid password",
    });

  if (plainPassword.length < 8) {
    return res.status(200).json({
      status: "error",
      error: "Password length should be more than 8 characters",
    });
  }

  const user = await UserModel.findOne({ email }).lean();

  if (!user) {
    return res.status(200).json({
      status: "error",
      error: "Invalid email-ID/password",
    });
  }

  if (await bcrypt.compare(plainPassword, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );
    return res.status(200).json({ status: "ok", data: token });
  }

  res.status(400).json({
    status: "error",
    error: "Invalid email-ID/password",
  });
});

module.exports = router;
