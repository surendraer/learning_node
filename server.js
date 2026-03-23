//main file

const express = require("express")
const app = express()
const db = require("./db");
require("dotenv").config();

// this is for authorization 
const passport = require("./auth.js");
const LocalStrategy = require("passport-local").Strategy;

// this is a middleware that parse the body into object and object into json 
const bodyParser = require("body-parser")
app.use(bodyParser.json());

// middle ware (customised for printing the logs)
const logging = (req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} accessed ${req.originalUrl}   `)
  next();// this is a callback function 
}
app.use(logging);

// testing route , usually we dont write our routes in server file
app.get('/', passport.authenticate('local', { session: false }), (req, res) => {
  res.send('Hello World')
})

app.use(passport.initialize());


const menuRoute = require("./routes/menuRoutes.js");
app.use("/menulist", menuRoute);

const personRoute = require("./routes/personRoutes.js")
app.use("/person", personRoute)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})