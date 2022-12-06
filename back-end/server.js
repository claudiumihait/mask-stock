const express = require("express");
const config = require("dotenv").config;
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("./passportSetup");

const app = express();

app.use(cors());

// app.use(session({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: true,
// }));
// app.use(passport.session());
// require("./passportSetup")(passport);
// app.use(cookieParser);
app.use(passport.initialize());

//get all data from .env
config();
const port = process.env.PORT || 9000;

//connect mask-stock database
const tools = require("./tools.js");
tools.connectToDb(process.env.ATLAS_URI);

//parsing JSON requests to data -> req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//using all routes
const userRoute = require("./routes/user");
app.use("/user", userRoute);

app.get("/", async (req, res) => {
    let hospitalNames = await tools.getHospitalNames(process.env.ATLAS_URI);
    res.send(hospitalNames);
});

//setting server port
app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));

