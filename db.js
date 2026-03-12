// const mongoose = require('mongoose');

// const mongoURL = 'mongodb://localhost:27017/hotels'//define mongodb url

// //setup mongodb connection

// mongoose.connect(mongoURL)

// const db = mongoose.connection;

// db.on('connected',()=>{
//     console.log("MongoDB is connected");
// });

// db.on('error',(err)=>{
//     console.log("error in connecting db: "+err);
// });

// db.on('disconnected',()=>{
//     console.log("database is disconnected");
// });


//export database:

// module.exports = db;




// import mongoose 
const mongoose = require("mongoose");

// import the url 

const MongoURL = 'mongodb://localhost:27017/hotels';

// create connection 

mongoose.connect(MongoURL);

// get the obj

const db = mongoose.connection;

// set event listeners

db.on("connected",()=>{
    console.log("database connected");
});

db.on("disconnected",()=>{
    console.log("database disconnected");
});

db.on("error",(err)=>{
    console.log("error in connecting: "+err);
});

module.exports = db;