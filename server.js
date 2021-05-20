const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGO_URI } = require("./config");
//require('dotenv').config();
// Routes
const ambulanceRoutes = require("./routes/api/ambulance");
const bedRoutes = require("./routes/api/bed");
const bloodDonorRoutes = require("./routes/api/blood");
const foodRoutes = require("./routes/api/food");
const homeTestingRoutes = require("./routes/api/hometesting");
const medicineRoutes = require("./routes/api/medicine");
const onlineDocRoutes = require("./routes/api/onlinedoc");
const oxygenRoutes = require("./routes/api/oxygen");
const plasmaRoutes = require("./routes/api/plasma");
const remdesivirRoutes = require("./routes/api/remdesivir");
const teleCounsellingRoutes = require("./routes/api/tele");
const registrationRoutes = require("./routes/api/register");
const loginRoutes = require("./routes/api/login");

const feedbackRoutes = require("./routes/api/feedback");

// Form Routes
const neravuRoutes = require("./routes/api/neravu");

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
app.use("/api/bed", bedRoutes);
app.use("/api/blooddonor", bloodDonorRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/hometesting", homeTestingRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/onlinedoc", onlineDocRoutes);
app.use("/api/oxygen", oxygenRoutes);
app.use("/api/plasma", plasmaRoutes);
app.use("/api/remdesivir", remdesivirRoutes);
app.use("/api/tele", teleCounsellingRoutes);

app.use("/api/register", registrationRoutes);
app.use("/api/login", loginRoutes);

app.use("/api/feedback", feedbackRoutes);

app.use("/api/neravu", neravuRoutes);

// Listen to server
app.listen(process.env.PORT || 11000, () => console.log("Server Started"));
