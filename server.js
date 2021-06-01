const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGO_URI } = require("./config");
//require('dotenv').config();

// Routes
const ambulanceRoutes = require("./routes/api/ambulance");
const bloodDonorRoutes = require("./routes/api/blood");
const foodRoutes = require("./routes/api/food");
const homeTestingRoutes = require("./routes/api/hometesting");
const onlineDocRoutes = require("./routes/api/onlinedoc");
const oxygenRoutes = require("./routes/api/oxygen");
const teleCounsellingRoutes = require("./routes/api/tele");

// Authentication
const registrationRoutes = require("./routes/api/register");
const loginRoutes = require("./routes/api/login");

// Feedback
const feedbackRoutes = require("./routes/api/feedback");

// Medicine tab routes
const jakBangaloreRoutes = require("./routes/api/jakbangalore")
const jakKarnatakaRoutes = require("./routes/api/jakkarnataka")
const medicineOfflineRoutes = require("./routes/api/medicinebangalore")
const medicineOnlineRoutes = require("./routes/api/medicineonline")

const app = express();

// Body Parser Middleware
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// CONNECT TO MONGO
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MONGO DB CONNECTED!"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/ambulance", ambulanceRoutes);
app.use("/api/blooddonor", bloodDonorRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/hometesting", homeTestingRoutes);
app.use("/api/onlinedoc", onlineDocRoutes);
app.use("/api/oxygen", oxygenRoutes);
app.use("/api/tele", teleCounsellingRoutes);

// Medicine routes
app.use("/api/jakbangalore", jakBangaloreRoutes)
app.use("/api/jakkarnataka", jakKarnatakaRoutes)
app.use("/api/medicineoffline", medicineOfflineRoutes)
app.use("/api/medicineonline", medicineOnlineRoutes)

// Auth routes
app.use("/api/register", registrationRoutes);
app.use("/api/login", loginRoutes);

// Feedback route
app.use("/api/feedback", feedbackRoutes);



// Listen to server
app.listen(process.env.PORT || 11000, () => console.log("Server Started"));
