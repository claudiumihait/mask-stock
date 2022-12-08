const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Products = require("./models/products.model");
const Hospitals = require("./models/hospitals.model");
const Orders = require("./models/orders.model");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const fs = require('fs');
require("./passportSetup");
const PORT = process.env.PORT || 9000;
const app = express();

//use cors
app.use(cors({
  origin: ["http://127.0.0.1:5173"],
  credentials: true
}));

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

app.use(cookieParser());


//connect mask-stock database
const tools = require("./tools.js");
tools.connectToDb(process.env.ATLAS_URI);

//parsing JSON requests to data -> req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//using all routes
const userRoute = require("./routes/user");
app.use("/user", userRoute);
const hospitalRouter = require("./routes/hospital");
app.use("/api/hospitals", hospitalRouter);

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
        "account":`${client.account_number}`,
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

app.get("/downloadInvoice", async(req,res)=>{
    const filePath = `${__dirname}/invoice.pdf`;
    // filePath? res.download(filePath) : null;
    if(filePath){
        res.download(filePath)
        setTimeout(()=>{
            fs.unlinkSync(filePath)
        },5000)
    }
})

app.get("/stocks", async (req, res) => {
  const products = await Products.find({}, { _id: 0, name: 1, qty: 1 });
  res.json(products);
});


//setting server port
app.listen(PORT, (_) => console.log(`http://127.0.0.1:${PORT}`));
