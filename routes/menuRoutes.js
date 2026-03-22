const express = require("express")
const router = express.Router();
const menulist = require("../models/menulist")

router.get("/",async (req,res)=>{

  try {

    const data = await menulist.find();
    console.log("menu fetched");
    res.status(200).json(data);
    
  } catch (error) {

    console.log("error in fetching");
    res.status(500).json({error : "error"});
    
  }
})



router.post("/",async (req,res) => {
  try {

    const data = req.body;
    const newMenu = new menulist(data);

    const response = await newMenu.save();
    console.log("added in menu");
    res.status(200).json(data);
    
  } catch (error) {
    console.log("error in saving");
    res.status(500).json({error:"error"});
    
  }
})

module.exports = router;
