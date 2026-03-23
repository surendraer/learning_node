const mongoose = require("mongoose");
//creating schema for menu
const menuschema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

})

const menuList = mongoose.model('menuList', menuschema);


module.exports = menuList;