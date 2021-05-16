const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

const router = express.Router();

router.use(cors());
const bcrypt = require("bcryptjs");

// User Model
const UserModel = require("../../models/UserModel");

// @routes POST api/register
// @desc POST user register
router.post("/", async (req, res) => {
  let token = req.header("Authorization");
  if (!token)
    return res.status(401).send({
      status: "error",
      error: "Access denied",
    });

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

  const password = await bcrypt.hash(plainPassword, 10);
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
  }
  jwt.verify(token, JWT_SECRET, async function (err, decoded) {
    if (err)
      return res.status(200).json({ status: "error", data: "Session expired" });
    else {
      try {
        const createUserResult = await UserModel.create({ email, password });
        if (!createUserResult)
          throw Error("An error occured while creating a user.");
        res.status(200).json({ status: "ok", data: "User created" });
      } catch (error) {
        if (error.code === 11000)
          res.status(200).json({
            error: "Email ID already exists.",
            status: "error",
          });
        else
          res.status(400).json({
            error: error,
          });
      }
    }
  });
});

module.exports = router;
