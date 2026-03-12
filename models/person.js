const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    work :{
        type: String,
        required : true,
        enum:["chef","waiter","owner"]
    },
    email:{
        type: String,
        required:true,
        unique:true
    } 
})


// create model

const person = mongoose.model('person',personSchema);

module.exports = person;