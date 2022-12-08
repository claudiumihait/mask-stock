const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Hospital = require("../models/hospitals.model");
const Users = require("../models/users.model");

router.post("/", async (req, res) => {
  try {
    const newHospital = req.body;
    if (newHospital) {
      const addHospital = await Hospital.create(newHospital)
      let id = addHospital._id;
      
      
      addHospital.users.forEach(async(user)=>{
        let findUser = await Users.findOne({email:user.email})
        if(findUser){
          let userHospitals = [...findUser.hospitals,id]
          await findUser.updateOne({hospitals:userHospitals})
        }
      })
      res.json("Successfully created new hospital");
    } else {
      res.json("Something went wrong, please check all fields and try again!");
    }
    res.end();
  } catch (error) {
    console.log(error);
    res.json("Something went wrong with the server, please try submitting again");
  }
});

module.exports = router;
