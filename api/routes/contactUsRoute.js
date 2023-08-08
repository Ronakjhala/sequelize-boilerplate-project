const express = require("express");
const conRoute = express();
const contactUsController = require("../controllers/contactUsController");


conRoute.post("/addContact",contactUsController.addContact);
conRoute.post("/updateContact/:id", contactUsController.updateContact);
conRoute.get("/getContact/:id", contactUsController.getContact);
conRoute.post("/deleteContact/:id", contactUsController.deleteContact);
conRoute.post("/deleteAllContact", contactUsController.deleteAllContact);
conRoute.post("/deleteMultipleContact", contactUsController.deleteMultipleContact);

module.exports = conRoute;