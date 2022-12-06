// const userSchema = require("./models/users.model");
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const dbo = require("../db/conn");

// const ObjectId = require("mongodb").ObjectId;

// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser((id, done) => {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     db_connect.collection("users").findOne(myquery, function (err, user) {
//         done(err, user);
//     })
// });

// passport.use(
//     new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//         let db_connect = dbo.getDb();
//         db_connect.collection("users").findOne({ email: email }).then((user) => {
//             if (!user) {
//                 let newUser = new userSchema({ email, password });
//                 bcrypt.genSalt(10, (err, salt) => {
//                     bcrypt.hash(newUser.password, salt, (err, hash) => {
//                         if (err) {
//                             throw err;
//                         };
//                         newUser.password = hash;
//                         newUser.save().then((user) => { return done(null, user) }).catch((err) => { return done(null, false, { message: err }) });
//                     });
//                 });
//             } else {
//                 bcrypt.compare(password, user.password, (err, isMatch) => {
//                     if (err) {
//                         throw err;
//                     };
//                     if (isMatch) {
//                         return done(null, user);
//                     } else {
//                         return done(null, false, { message: "Wrong Password" });
//                     }
//                 });
//             };
//         }).catch((err) => {
//             return done(null, false, { message: err });
//         })
//     })
// );

// module.exports = { passport };

// // const passport = require("passport");
// // const dbo = require("../db/conn");

// // const tools = require("../../tools");

// // router.post("/", async (request, response) => {
// //     passport.authenticate("local", function (err, user, info) {
// //         if (err) {
// //             return response.status(400).json({ errors: err });
// //         };
// //         if (!user) {
// //             return response.status(400).json({ errors: "No user found" });
// //         }
// //     });
// //     request.logIn(user, function (err) {
// //         if (err) {
// //             return response.status(400).json({ error: err });
// //         };
// //         return res.status(200).json({ success: `logged in ${user._id}` });
// //     });
// // });
