const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRoute = require('./router/authRoute')
const aadharRoute = require('./router/aadharRoute')

// Initiate Environmental Variable
dotenv.config();

// Parse Body
app.use(express.json())

// Connect To Database
require('./config/db')

// Define Port
const port = process.env.PORT || 8000;


// HomePage
app.get('/', (req, res) => {
  res.send("This is Homepage...")
})

// Auth Routes
app.use("/auth", authRoute)

// Aadhar Routes
app.use("/aadhar", aadharRoute)

// Initiate Server
app.listen(port, () => {
  console.log("App is listening at port: " + port);
})
