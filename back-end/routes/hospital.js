const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Hospital = require("../models/hospitals.model");

router.post("/", async (req, res) => {
  try {
    const newHospital = req.body;
    console.log(newHospital);
    if (newHospital) {
      await new Hospital(newHospital).save();
      res.json("Succesfully created new hospital");
    } else {
      res.json("Something went wrong, please check all fields!");
    }
    res.end();
  } catch (error) {
    console.log(error);
    res.json("Something went wrong, please try submitting again");
  }
});

module.exports = router;
