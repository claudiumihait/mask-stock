const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true, unique: true },
    email_is_verified: {type: Boolean, default: false},
    password: { type: String },
    hospital: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "hospitals"
    }
});

module.exports = mongoose.model("users", userSchema);