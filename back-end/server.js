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
const productsModel = require("./models/products.model.js");
app.use("/login", loginRoute);


app.get("/", async (req, res) => {
    let hospitalNames = await tools.getHospitalNames(process.env.ATLAS_URI);
    let productsName = await tools.getProducts()
    res.send(hospitalNames,productsName);
});


// Routes
app.get("/", (req,res)=>{
    res.json({message: "GET ROUTE for /"})
})
app.get("/hospitals", async(req,res)=>{
    const response = await fetch("https://api.billingo.hu/v3/partners",{
        headers: {
            'X-API-KEY': '2a808996-6f31-11ed-8f89-06ac9760f844',
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    if(response.ok){
        Hospitals.insertMany(json.data)
        .then(function(){
            console.log("Data inserted")  // Success
        }).catch(function(error){
            console.log("error: ",error)      // Failure
        });
    }
    if(!response.ok){
        res.status(400).json({message:"something went wrong with get data"})
    }
})

//setting server port
app.listen(port, (_) => console.log(`http://127.0.0.1:${port}`));
