const express = require("express")
const router = express.Router();
const person = require("../models/person")
const {jasonmiddleware,jwttokengenerator} = require("../jwt");

router.post("/signup", async (req, res) => {

    try {
        const data = req.body;

        const newPerson = new person(data);
        const response = await newPerson.save();

        const token = jwttokengenerator(response.email);
        console.log("data saved and token is ", token);
        res.status(200).json({response : response, token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error" });
    }
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.work = data.work;
    // newPerson.email = data.email
})

// login route
router.post("/login", async (req,res)=>{

    const {username,password} = req.body;

    const user = await person.findOne({username:username});

    if(!user || !(await user.comparePassword(password))){
        return res.status(500).json({error: "invalid user"});
    }

    try {

        const token = jwttokengenerator(req.body.email);
        res.json(token);
        
    } catch (error) {

        res.status(500).json({error: "internal server error"});
        
    }

})

router.get("/", async (req, res) => {
    try {

        const data = await person.find();
        console.log("fetched all data");
        res.status(200).json(data);

    } catch (error) {
        console.log("error " + error);
        res.status(500).json({ error: "error in fetching data" });

    }
})


router.get("/:work", async (req, res) => {
    try {
        const worktype = req.params.work;
        if (worktype == "chef" || worktype == "waiter" || worktype == "owner") {

            const response = await person.find({ work: worktype });
            console.log("success");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "error" });
        }
    } catch (error) {
        console.log("error");
        res.status(500).json({ error: "error" });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const personid = req.params.id;
        const persondata = req.body;

        const response = await person.findByIdAndUpdate(personid, persondata, {
            new: true,
            runValidators: true
        })

        if (!response) {
            console.log("not found");
            return res.status(404).json({ error: "person not found" });
        }

        console.log("person found and updated");

        res.status(200).json(response);
    } catch (error) {
        console.log("error in db ")
        res.status(500).json({ error: "error" });
    }
})

module.exports = router;