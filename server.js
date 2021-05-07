const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

// Routes
const ambulanceRoutes = require('./routes/api/ambulance')

const app = express();

// Body Parser Middleware
app.use(express.urlencoded({ extended: true }))

// CONNECT TO MONGO
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false })
  .then(() => console.log("MONGO DB CONNECTED!"))
  .catch((err) => console.error(err));

// Routes
app.use('/api/ambulance',ambulanceRoutes)

// Listen to server
app.listen(11000, () => console.log("Server Started"));
