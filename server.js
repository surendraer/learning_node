const express = require("express")
const app = express()
const db = require("./db");
require("dotenv").config();


// syntax to use middleware app.use(express.json())
const bodyParser = require("body-parser")
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World')
})

const menuRoute = require("./routes/menuRoutes.js");
app.use("/menulist",menuRoute);

const personRoute = require("./routes/personRoutes.js")
app.use("/person",personRoute)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})