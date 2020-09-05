const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./users-model");
const restrict = require("../middleware/restrict");

const router = express.Router();

router.get("/api/users", restrict("finance"), async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

//--------------------//
//  Create a new user //
//--------------------//
router.post("/api/register", async (req, res, next) => {
  try {
    const { username, password, department } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 14),
      department
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

//--------//
//  Login //
//--------//
router.post("/api/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        userID: user.id,
        username: user.username, 
        department: user.department,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.json({
      message: `Welcome ${user.username}!`,
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router