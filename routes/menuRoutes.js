const express = require("express")
const router = express.Router();
// requiring menu model
const menulist = require("../models/menulist")

// get all data
router.get("/", async (req, res) => {

  try {

    const data = await menulist.find();
    console.log("menu fetched");
    res.status(200).json(data);

  } catch (error) {

    console.log("error in fetching");
    res.status(500).json({ error: "error" });

  }
})


// posting in menu
router.post("/", async (req, res) => {
  try {
    // extracting data from body
    const data = req.body;
    //creating new object
    const newMenu = new menulist(data);
    //adding it to db
    const response = await newMenu.save();
    console.log("added in menu");
    res.status(200).json(data);

  } catch (error) {
    console.log("error in saving");
    res.status(500).json({ error: "error" });

  }
})

module.exports = router;
