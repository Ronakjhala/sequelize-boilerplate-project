const express = require("express");
const catRoute = express();
const categoryController = require("../controllers/categoryController");


catRoute.post("/addCategory",categoryController.addCategory);
 catRoute.post("/updateCategory/:id", categoryController.updateCategory);
 catRoute.post("/getCategory/:id", categoryController.viewCategory);
catRoute.post("/deleteCategory/:id", categoryController.deleteCategory);
catRoute.post("/deleteAllCategory", categoryController.deleteAllCategory);
catRoute.post("/deleteMultipleCategory", categoryController.deleteMultipleCategory);

module.exports = catRoute;
