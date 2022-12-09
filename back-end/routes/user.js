const express = require("express");
const router = express.Router();
const tools = require("../tools");
const config = require("dotenv").config;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/users.model");
const createError = require("http-errors");
const sendEmail = require("../nodemailer");
const path = require("path");
config();

router.use(cookieParser());

router.post("/register", async (request, response) => {
  try {
    let result;
    if (Object.keys(request.body).length === 1) {
      switch (Object.keys(request.body)[0]) {
        case "username":
          result = await tools.checkUsername(request.body.username);
          response.json([{ message: result }]);
          break;
        case "email":
          result = await tools.checkEmail(request.body.email);
          response.json([{ message: result }]);
          break;
      }
    } else {
      const hospitalIds = await tools.getHospitalsByEmail(request.body.email);
      result = await tools.createUser(
        request.body.username,
        request.body.email,
        request.body.password,
        hospitalIds
      );
      const message = `Click on this link to verify your email: \n ${process.env.BASE_URL}/user/auth/${result[1]}/${result[0]}`;
      const subject = "Verify your email";
      const from = "EMAIL VERIFIER";
      sendEmail(request.body.email, message, subject, from);
      response.json([
        {
          name: request.body.username,
          id: result[1],
          token: result[0],
          maxAge: 3 * 24 * 60 * 60 * 1000,
        },
      ]);
    }
  } catch (error) {
    response.status(500).json({ error: error });
  }
});

router.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await tools.checkUserOnLogin(email, password);
    const token = tools.signToken(user._id);
    // response.cookie("jwt", token, {
    //     credentials: true,
    //     httpOnly: false,
    //     sameSite: "None",
    //     secure: true,
    //     maxAge: 3 * 24 * 60 * 60 * 1000
    // });
    response
      .status(200)
      .json({ user: user, token: token, maxAge: 3 * 60 * 60 * 1000 });
  } catch (error) {
    response.status(500).json({ error: error });
  }
});

router.post("/auth", async (request, response, next) => {
    const token = request.body.token;
    // console.log(request.cookies)
    if (token) {
        jwt.verify(token, process.env.SECRET, async (error, decodedToken) => {
            if (error) {

                response.json({ status: false });
                next();
            } else {
                const user = await tools.getUserById(decodedToken.userID);
                if (user) {
                    response.json({ status: true, user: user.username });
                } else {
                    response.json({ status: false });
                    next();
                }
            }
        });
    } else {
        response.json({ status: false });
        next();
    }
});

router.post("/user-data", async (request, response, next) => {
    try {
        let result = await tools.getHospitalDataByUserName(request.body.username);
        response.json({ result: result });
    } catch (error) {
        response.status(500).json({ "error": error });
    };
});

router.get("/auth/:id/:token", async (req, res, next) => {
  try {
    console.log("in auth");
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return next(createError.BadRequest("Invalid Link"));
    await User.updateOne({ _id: user.id }, { verified: true });

    res.sendFile(path.join(__dirname + "../../../front-end/verified.html"));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
