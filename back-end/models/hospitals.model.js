const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({});

module.exports = mongoose.model("hospital", hospitalSchema);