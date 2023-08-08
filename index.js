const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static("public"));
const cors=require("cors");
const passport = require("passport");
app.use(passport.initialize());
const userRoutes = require("./api/routes/userRoute");
app.use("/api", userRoutes);
const addRoutes = require("./api/routes/addressBookRoute");
app.use("/api", addRoutes);
 const catRoutes = require("./api/routes/categoryRoutes.js");
 app.use("/api", catRoutes);
const tesRoutes = require("./api/routes/testimonialRoute");
app.use("/api", tesRoutes);
 const conRoutes = require("./api/routes/contactUsRoute");
 app.use("/api", conRoutes);

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Boiler Plate ",
  });
});
app.listen(process.env.APP_PORT, () => {
  console.log("connected", process.env.APP_PORT);
});


