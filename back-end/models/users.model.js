const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  hospitals: { type: Array },
  verified: { type: Boolean, default: false },

});

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// userSchema.methods.login = async function (email, password) {
//     const user = userSchema.findOne({ email: email });
//     console.log(user)
//     if (user) {
//         const auth = await bcrypt.compare(password, user.password);
//         if (auth) {
//             return user;
//         } else {
//             throw Error("incorrect password");
//         }
//     } else {
//         throw Error("incorrect email");
//     }
// };

module.exports = mongoose.model("users", userSchema);