const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const tools = require("../tools");

router.post('/register', async (request, response) => {
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
            result = await tools.createUser(request.body.username, request.body.email, request.body.password, hospitalIds);
            response.json([{ status: result }]);
        }
    } catch (error) {
        response.status(500).json({ "error": error });
    };
});

// router.post('/login', passport.authenticate('local', { session: false }), (request, response) => {
//     if (request.isAuthenticated()) {
//         const { _id, email } = request.user;
//         console.log(_id);
//         const token = tools.signToken(_id);
//         response.cookie('qid', token, { httpOnly: true, sameSite: true });
//         console.log(token);
//         response.status(200).json({});
//     }
// })

module.exports = router;