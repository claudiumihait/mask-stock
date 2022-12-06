const express = require("express");
const config = require("dotenv").config;
const cors = require("cors");
const morgan = require("morgan");
const app = express();
//get all data from .env
config();
const port = process.env.PORT;

//connect mask-stock database
const tools = require("./tools.js");
tools.connectToDb(process.env.ATLAS_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use((err, req, res, next) => {
  //res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const registerRouter = require("./routes/register");
app.use("/api/register", registerRouter);

//parsing JSON requests to data -> req.body

//using all routes
const registerRoute = require("./routes/register");
app.use("/api/register", registerRoute);
const loginRoute = require("./routes/login");
app.use("/login", loginRoute);

app.get("/", async (req, res) => {
  let hospitalNames = await tools.getHospitalNames(process.env.ATLAS_URI);
  res.send(hospitalNames);
});

//setting server port
app.listen(port, (_) => console.log(`http://127.0.0.1:${port}`));
