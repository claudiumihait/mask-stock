const mongoose = require("mongoose");
const userSchema = require("./models/users.model");
const hospitalSchema = require("./models/hospitals.model");
const productsSchema = require("./models/products.model");
const jwt = require("jsonwebtoken");
const config = require("dotenv").config;
const bcrypt = require("bcrypt");
const easyinvoice = require('easyinvoice');
const fs = require('fs');
config();

const connectToDb = (connectionURI) => {
  mongoose
    .connect(connectionURI)
    .catch((error) => console.error(error))
    .then((response) =>
      console.log(`Connected to DB: ${response.connection.name}`)
    );
};

const checkUsername = async (name) => {
  if (name.length < 5) {
    return "Username too short.";
  } else {
    let usernames = await userSchema.find({}, { _id: 0, username: 1 });
    if (usernames.map((obj) => obj.username.toLowerCase()).includes(name.toLowerCase())) {
      return "Username already taken.";
    } else {
      return "Valid username.";
    }
  }
};

const checkEmail = async (value) => {
  let isValidEmail = false;
  const hospitalsData = await hospitalSchema.find({}, { _id: 0, users: 1 });
  const usersOfHospitals = hospitalsData.map((obj) => obj.users);
  usersOfHospitals.forEach((item) => {
    item.forEach((obj) => {
      if (obj.email == value) {
        isValidEmail = true;
        return;
      }
    });
  });
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(`${value}`)) {
    return "Invalid email.";
  } else if (!isValidEmail) {
    return "Not a valid email.";
  } else {
    let emails = await userSchema.find({}, { _id: 0, email: 1 });
    if (emails.map((obj) => obj.email).includes(value)) {
      return "Email already taken.";
    } else {
      return "Valid email.";
    }
  }
};

const getHospitalsByEmail = async (value) => {
  let hospitalIds = [];
  const hospitalsAndUsers = await hospitalSchema.find({}, { _id: 1, users: 1 });
  const usersOfHospitals = hospitalsAndUsers.map((item) => item.users);
  usersOfHospitals.forEach((item, index) => {
    item.forEach((obj) => {
      if (obj.email === value) {
        hospitalIds.push(hospitalsAndUsers[index]._id);
        return;
      }
    });
  });
  return hospitalIds;
};

const createUser = async (name, mail, pass, hospitalIds) => {
  const user = new userSchema({
    username: name,
    email: mail,
    password: pass,
    hospitals: hospitalIds,
  });
  try {
    const newUser = await user.save();
    const token = signToken(user._id);
    return [token, user._id];
  } catch (error) {
    return false;
  }
};

const signToken = (userID) => {
  return jwt.sign({ userID }, process.env.SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const checkUserOnLogin = async (email, password) => {
  const user = await userSchema.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    console.log(user);
    if (auth && user.verified) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  } else {
    throw Error("incorrect email");
  }
  return user;
};


const getHospitalNames = async () => {
  let hospitalNames = await hospitalSchema.find({}, { _id: 0, name: 1 });
  return hospitalNames;
};

const getProducts = async () => {
  let products = await productsSchema.find();
  return products;
};

const getUserById = async (id) => {
    const user = await userSchema.findOne({ _id: id });
    return user
};

const getHospitalDataByUserName = async (username) => {
    const user = await userSchema.findOne({ username: username });
    const hospitals = await hospitalSchema.find({ _id: { $in: user.hospitals } });
    const result = hospitals.map((item) => { return { "Hospital Name": item.name, "Admin": item.users.filter((item) => item.email === user.email)[0].admin, "data": item } });
    return result 
};

const generateInvoice = async(order) => {
    const today = new Date();
    let due_date = new Date();
    due_date.setDate(due_date.getDate() + parseInt("7"))

    let data = {
        "client": {
            "company": order.company,
            "address": order.address,
            "zip": order.zip,
            "city": order.city,
            "country": order.country,
            "iban": order.iban,
            "swift":order.swift,
            "account":order.account,
            "phone":order.phone
        },

        "sender": {
            "company": "Sample Corp",
            "address": "Sample Street 123",
            "zip": "1234 RO",
            "city": "Bucharest",
            "country": "Romania"
        },

        // Of course we would like to use our own logo and/or background on this invoice. There are a few ways to do this.
        "images": {
            logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
        },

        // Let's add some standard invoice data, like invoice number, date and due-date
        "information": {
            // Invoice number
            "number": "2021.0001",
            // Invoice data
            "date": today.toLocaleDateString(),
            // Invoice due date
            "due-date": due_date.toLocaleDateString()
        },

        // Now let's add some products! Calculations will be done automatically for you.
        "products": [
            {
                "quantity": order.quantity,
                "description": order.description,
                "tax-rate": parseInt(order.tax_rate),
                "price": 1
            }
        ],

        // We will use bottomNotice to add a message of choice to the bottom of our invoice

        "bottom-notice": `Kindly pay your invoice within ${order.due_days} working days.`,
 
        // Here you can customize your invoice dimensions, currency, tax notation, and number formatting based on your locale
        "settings": {
            "currency": `${order.currency}`, // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
            "tax-notation": "vat"
            /*
             "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
             "tax-notation": "gst", // Defaults to 'vat'
    
             // Using margin we can regulate how much white space we would like to have from the edges of our invoice
             "margin-top": 25, // Defaults to '25'
             "margin-right": 25, // Defaults to '25'
             "margin-left": 25, // Defaults to '25'
             "margin-bottom": 25, // Defaults to '25'
    
             "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
             "height": "1000px", // allowed units: mm, cm, in, px
             "width": "500px", // allowed units: mm, cm, in, px
             "orientation": "landscape", // portrait or landscape, defaults to portrait
             */
    },

    /*
            Last but not least, the translate parameter.
            Used for translating the invoice to your preferred language.
            Defaults to English. Below example is translated to Dutch.
            We will not use translate in this sample to keep our samples readable.
         */
    translate: {
      /*
             "invoice": "FACTUUR",  // Default to 'INVOICE'
             "number": "Nummer", // Defaults to 'Number'
             "date": "Datum", // Default to 'Date'
             "due-date": "Verloopdatum", // Defaults to 'Due Date'
             "subtotal": "Subtotaal", // Defaults to 'Subtotal'
             "products": "Producten", // Defaults to 'Products'
             "quantity": "Aantal", // Default to 'Quantity'
             "price": "Prijs", // Defaults to 'Price'
             "product-total": "Totaal", // Defaults to 'Total'
             "total": "Totaal" // Defaults to 'Total'
             */
    },

    /*
            Customize enables you to provide your own templates.
            Please review the documentation for instructions and examples.
            Leave this option blank to use the default template
         */
  };

    // easyinvoice.createInvoice(data, function (result) {
    //     //The response will contain a base64 encoded PDF file
    //     var pdf = result.pdf;

    //     //Now let's save our invoice to our local filesystem
    //     fs.writeFileSync("invoice.pdf", pdf, 'base64');
    // });
    console.log("verificare data: ", data)
    const result = await easyinvoice.createInvoice(data);
    fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
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
  checkUserOnLogin,
  getUserById,
  generateInvoice,
  getHospitalDataByUserName
};
