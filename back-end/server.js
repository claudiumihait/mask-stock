const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Products = require("./models/products.model");
const Hospitals = require("./models/hospitals.model");
const Orders = require("./models/orders.model");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fs = require('fs');
require("./passportSetup");
const PORT = process.env.PORT || 9000;
const app = express();

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

// app.use(session({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: true,
// }));
// app.use(passport.session());
// require("./passportSetup")(passport);
app.use(cookieParser());
app.use(passport.initialize());

//connect mask-stock database
const tools = require("./tools.js");
tools.connectToDb(process.env.ATLAS_URI);

//parsing JSON requests to data -> req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const productsModel = require("./models/products.model.js");

//using all routes
const userRoute = require("./routes/user");
app.use("/user", userRoute);

// Routes
app.get("/", async (req, res) => {
  let hospitalNames = await tools.getHospitalNames(process.env.ATLAS_URI);
  let productsName = await tools.getProducts();
  res.send(hospitalNames, productsName);
});

app.post("/order", async (req, res) => {
  const { hospital, product, quantity } = req.body;

  let saveOrder = await Orders.create({client:hospital, product:product, qty:quantity})
  const updateQty = await Products.findOneAndUpdate(
    { name: product },
    { $inc: { qty: -parseInt(quantity) } }
  );

  let client = await Hospitals.findOne({name:hospital})

    let basket = {
        "company": `${client.name}`,
        "address": `${client.address.address}`,
        "zip": `${client.address.post_code} ${client.address.country_code}`,
        "city": `${client.address.city}`,
        "country": `${client.address.country_code}`,
        "iban":`${client.iban}`,
        "swift":`${client.swift}`,
        "accout":`${client.accout_number}`,
        "phone":`${client.phone}`,
        "description":`${product}`,
        "quantity": `${quantity}`,
        "tax_rate": `${client.group_member_tax_number}`,
        "currency":`${client.custom_billing_settings.document_currency}`,
        "due_days":`${client.custom_billing_settings.due_days}`
    }

    await tools.generateInvoice(basket)
    res.json({ message: "Ok" });

});

app.get("/downloadInvoice", (req,res)=>{
    const filePath = `${__dirname}/invoice.pdf`;

    res.download(filePath);
})

app.get("/stocks", async (req, res) => {
  const products = await Products.find({}, { _id: 0, name: 1, qty: 1 });
  res.json(products);
});

app.get("/hospitals", async (req, res) => {
  const response = await fetch("https://api.billingo.hu/v3/partners", {
    headers: {
      "X-API-KEY": "2a808996-6f31-11ed-8f89-06ac9760f844",
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  if (response.ok) {
    Hospitals.insertMany(json.data)
      .then(function () {
        console.log("Data inserted"); // Success
      })
      .catch(function (error) {
        console.log("error: ", error); // Failure
      });
  }
  if (!response.ok) {
    res.status(400).json({ message: "something went wrong with get data" });
  }
});

//setting server port
app.listen(PORT, (_) => console.log(`http://127.0.0.1:${PORT}`));
