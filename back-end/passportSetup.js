const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const userSchema = require("./models/users.model");
const bcrypt = require("bcrypt");
const config = require("dotenv").config;

config();

const cookieFromExtractor = (request) => {
    let token = null;
    if (request && request.cookies) {
        token = request.cookies["qid"];
    };
    return token;
};

//local strategy
passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    }, async (email, password, done) => {
        userSchema.findOne({ email: email }).exec((err, user) => {
            if (err) {
                return done(err);
            };
            if (!user) {
                return done(null, false);
            };
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return done(err);
                };
                if (!isMatch) {
                    return done(null, isMatch);
                };
                return done(null, user);
            })
        })
    })
);

//JWT strategy token generator
passport.use(new JWTStrategy({
    jwtFromRequest: cookieFromExtractor,
    passReqToCallback: true,
    secretOrKey: process.env.SECRET,
}, (request, payload, done) => {
    console.log(payload.sub);
    userSchema.findOne({ _id: payload.sub }, (err, user) => {
        if (err) {
            return done(err);
        };
        if (!user) {
            return done(null, false);
        } else {
            request.user = user;
            return done(null, user);
        };
    })
}))

// module.exports = (passport,username) => {
//     passport.use(
//         "local-signup",
//         new LocalStrategy(
//             {
//                 usernameField: "email",
//                 passwordField: "password",
//             },
//             async (email, password, done) => {
//                 try {
//                     // check if user exists
//                     const usernameExists = await userSchema.findOne({ "username": username });
//                     if (usernameExists) {
//                         return done(null, false, { message: "Already existing username!" });
//                     }
//                     // let hospitals = [];
//                     // const hospitalsAndUsers = await hospitalSchema.find({}, { _id: 1, users: 1 });
//                     // const usersOfHospitals = hospitalsAndUsers.map((item) => item.users);
//                     // usersOfHospitals.forEach((item, index) => { item.forEach((obj) => { if (obj.email === email) { hospitals.push(hospitalsAndUsers[index]._id); return}}) });
//                     // const userExists = hospitals.length;
//                     const useremailExists = await userSchema.findOne({ "email": email });
//                     if (useremailExists) {
//                         return done(null, false, { message: "Already existing email!" })
//                     }
//                     // Create a new user with the user data provided
//                     let hospitals = [];
//                     const hospitalsAndUsers = await hospitalSchema.find({}, { _id: 1, users: 1 });
//                     const usersOfHospitals = hospitalsAndUsers.map((item) => item.users);
//                     usersOfHospitals.forEach((item, index) => { item.forEach((obj) => { if (obj.email === email) { hospitals.push(hospitalsAndUsers[index]._id); return}}) });
//                     const user = await userSchema.create({ username, email, password, hospitals });
//                     return done(null, user);
//                 } catch (error) {
//                     done(error);
//                 }
//             }
//         )
//     );
//     passport.use(
//         "local-login",
//         new LocalStrategy(
//             {
//                 usernameField: "email",
//                 passwordField: "password",
//             },
//             async (email, password, done) => {
//                 try {
//                     const user = await userSchema.findOne({ email: email });
//                     if (!user) {
//                         return done(null, false, { message: "Wrong email!" });
//                     };
//                     const isMatch = await user.matchPassword(password);
//                     if (!isMatch) {
//                         return done(null, false, { message: "Wrong password!" });
//                     };
//                     // if passwords match return user
//                     return done(null, user);
//                 } catch (error) {
//                     console.log(error)
//                     return done(error, false);
//                 }
//             }
//         )
//     );
// };