require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express();


//Required middle ware
app.use(express.json());
//Required routes
app.get("/", (req, res) => {
    res.send("<h1>Hello From Auth System -LCO</h1>")
});

app.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        console.log("req body data", req.body)
        if (!(firstName && lastName && email && password)) {
            res.status(400).send('Required fields are missing');
        } else {
            const existingUser = await User.findOne({ email : "email" })
            console.log("existing user", existingUser)
            if (existingUser) {
                res.status(400).send('User is Already present please login...');
            }
            const encryptedPassword = bcrypt.hash(password, 10, () => {
                console.log("password has been encrypted")
            })
            const user = await User.create({
                firstName, LastName, email: email.toLowerCase(), password: encryptedPassword
            }).then(() => {
                console.log("User is crated successfully ")
            }).catch((err) => {
                console.log(`Error in creating user : ${err}`)
            })
            var token = jwt.sign({ user_id: user._id, email }, process.env.SECRET_KEY, { expiresIn: "2h" });

            user.token = token;
            user.password = undefined;
            res.status(201).json({ user })
        }
    } catch (error) {
        console.log(`Error : ${error}`)
    }
})

module.exports = app;