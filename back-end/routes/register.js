const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users.model");

router.put("/", async (req, res, next) => {
  try {
    console.log("in put");
    const { username, email } = req.body;
    let output = {
      error: "",
    };
      const doesUsernameExist = await User.findOne({ username: username });
      console.log(doesUsernameExist)
    if (doesUsernameExist) output.error = `${username} already exists`;
    //else output.error = "Valid username";

    const doesEmailExist = await User.findOne({ email: email });
    if (doesEmailExist) output.error = `${email} already exists`;
    //else output.error = "Valid email";
    res.json(output);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
