const express = require("express")
const router = express.Router();
// need persons model to create entry in db
const person = require("../models/person")
const { jasonmiddleware, jwttokengenerator } = require("../jwt");
//signup route
router.post("/signup", async (req, res) => {

    try {
        const data = req.body;
        // creating a new object of person using the data
        const newPerson = new person(data);
        // adding that entry in the database
        const response = await newPerson.save();
        // after adding it now we are creating a token
        const token = jwttokengenerator(response.email);
        console.log("data saved and token is ", token);
        // sending the token to the browser
        res.status(200).json({ response: response, token: token });

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
router.post("/login", async (req, res) => {
    // extracting the data 
    const { username, password } = req.body;
    // finding the username
    const user = await person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(500).json({ error: "invalid user" });
    }
    //if user exist we generate the token
    try {

        const token = jwttokengenerator(req.body.email);
        res.json(token);

    } catch (error) {

        res.status(500).json({ error: "internal server error" });

    }

})

//fetch all data
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

// fetch data based on some filter
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

// fetching based on id
router.put("/:id", async (req, res) => {
    try {
        const personid = req.params.id;
        const persondata = req.body;

        const response = await person.findByIdAndUpdate(personid, persondata, {
            // this will make sure the response contasins latest details
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



//profile route
router.get("/person", jasonmiddleware, async (req, res) => {
    // this is given by the niddleware
    const userData = req.user;
    // getting id 
    const userid = userData.id;
    // giving data of that id
    const user = await person.findById(userid);

    res.status(200).json(user);
})

module.exports = router;