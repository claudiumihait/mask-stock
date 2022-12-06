const express = require("express");
const config = require("dotenv").config;
const cors = require("cors");

const app = express();

app.use(cors())

//get all data from .env
config();
const port = process.env.PORT;

//connect mask-stock database
const tools = require("./tools.js");
tools.connectToDb(process.env.ATLAS_URI);

//parsing JSON requests to data -> req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//using all routes
const registerRoute = require("./routes/register");
app.use("/register", registerRoute);
const loginRoute = require("./routes/login");
const productsModel = require("./models/products.model.js");
app.use("/login", loginRoute);


app.get("/", async (req, res) => {
    let hospitalNames = await tools.getHospitalNames(process.env.ATLAS_URI);
    let productsName = await tools.getProducts()
    res.send(hospitalNames,productsName);
});

//setting server port
app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));

