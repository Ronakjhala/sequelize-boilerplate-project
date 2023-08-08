const express = require("express");
const addRoute = express();
const addressBookController = require("../controllers/addressBookController");

addRoute.post("/addAddress",addressBookController.addAddress);
addRoute.get("/viewAddress/:id",addressBookController.viewAddress);
addRoute.post("/updateAddress/:id", addressBookController.updateAddress);
addRoute.post("/deleteAddress/:id", addressBookController.deleteAddress);

module.exports = addRoute;
