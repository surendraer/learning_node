//this file is used to create the connection with database

// import mongoose 
const mongoose = require("mongoose");
require("dotenv").config();
// import the url 
const MongoURL = 'mongodb://localhost:27017/hotels';
//Online database url with env security
//const MongoURL = process.env.DB_URL;

// create connection 
mongoose.connect(MongoURL);

// get the obj
const db = mongoose.connection;

// set event listeners
db.on("connected", () => {
    console.log("database connected");
});

db.on("disconnected", () => {
    console.log("database disconnected");
});

db.on("error", (err) => {
    console.log("error in connecting: " + err);
});

module.exports = db;