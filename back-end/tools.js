const mongoose = require("mongoose");
const userSchema = require("./models/users.model");
const hospitalSchema = require("./models/hospitals.model");
const productsSchema = require("./models/products.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("dotenv").config;

const connectToDb = (connectionURI) => {
    mongoose.connect(connectionURI)
        .catch((error) => console.error(error))
        .then((response) => console.log(`Connected to DB: ${response.connection.name}`))
        // .then(async (response) => {});
};

const checkUsername = async (name) => {
    if (name.length < 5) {
        return "Username too short."
    } else {
        let usernames = await userSchema.find({}, { _id: 0, username: 1 });
        if (usernames.map((obj) => obj.username).includes(name)) {
            return "Username already taken."
        } else {
            return "Valid username."
        }
    }
};

const checkEmail = async (value) => {
    let isValidHospitalMail = false;
    const hospitalsData = await hospitalSchema.find({}, { _id: 0, users: 1 });
    const usersOfHospitals = hospitalsData.map((obj) => obj.users);
    usersOfHospitals.forEach((item) => { item.forEach((obj) => { if (obj.email == value) { isValidHospitalMail = true; return } }) });
    if (!value.match(/(.+)@(.+){2,}/i)) {
        return "Invalid email."
    } else if (!isValidHospitalMail) { 
        return "Not a hospital email."
    } else{
        let emails = await userSchema.find({}, { _id: 0, email: 1 });
        if (emails.map((obj) => obj.email).includes(value)) {
            return "Email already taken."
        } else {
            return "Valid email."
        }
    }
};

const getHospitalsByEmail = async (value) => {
    let hospitalIds = [];
    const hospitalsAndUsers = await hospitalSchema.find({}, { _id: 1, users: 1 });
    const usersOfHospitals = hospitalsAndUsers.map((item) => item.users);
    usersOfHospitals.forEach((item, index) => { item.forEach((obj) => { if (obj.email === value) { hospitalIds.push(hospitalsAndUsers[index]._id); return } }) });
    return hospitalIds
};

const createUser = async (name, mail, pass, hospitalIds) => {
    const user = new userSchema({ username: name, email: mail, password: pass, hospitals: hospitalIds });
    try {
        const newUser = await user.save();
        return true
    } catch (error) {
        return false
    }
};

const getHospitalNames = async () => {
    let hospitalNames = await hospitalSchema.find({}, { _id: 0, name: 1 });
    return hospitalNames
};

const signToken = (userID) => {
    return jwt.sign({
        iss: process.env.SECRET,
        SUB: userID,
    }, process.env.SECRET, { expiresIn: "1hr" });
}

const getProducts = async() => {
    let products = await productsSchema.find()
    return products
}

module.exports = {
    connectToDb,
    checkUsername,
    checkEmail,
    getHospitalNames,
    getHospitalsByEmail,
    createUser,
    signToken,
    getProducts,
}