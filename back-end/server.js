const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require("node-fetch")
const { default: mongoose } = require('mongoose');
const Hospitals = require("./models/hospitals.model")
require('dotenv').config()

// Mongo DB Connections
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});


// Middleware Connections
app.use(cors())
app.use(express.json())


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

// Connection
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})