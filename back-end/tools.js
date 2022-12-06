const mongoose = require("mongoose");
const userSchema = require("./models/users.model");
const hospitalSchema = require("./models/hospitals.model");
const productsSchema = require("./models/products.model")
const bcrypt = require("bcrypt");
MongoClient = require('mongodb').MongoClient

const connectToDb = (connectionURI) => {
    mongoose.connect(connectionURI)
        .catch((error) => console.error(error))
        .then((response) => console.log(`Connected to DB: ${response.connection.name}`))
    // .then(async (response) => {});
};

const getHospitalNames = async() => {
    let hospitalNames = await hospitalSchema.find({}, { _id: 0, name: 1 });
    return hospitalNames
}

const getProducts = async() => {
    let products = await productsSchema.find()
    return products
}

module.exports = {
    connectToDb,
    getHospitalNames,
    getProducts
}