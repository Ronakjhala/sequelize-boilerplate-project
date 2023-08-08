const express = require("express");
const tesRoute = express();
const testimonialController = require("../controllers/testimonialController");
const bodyParser = require("body-parser");
tesRoute.use(bodyParser.json());
tesRoute.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
const path = require("path");
tesRoute.use(express.static("public"));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(
        null,
        path.join(__dirname, "../public/userImages"),
        function (error, success) {
          if (error) throw error;
        }
      );
    },
    filename: function (req, file, cb) {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name, function (error1, success1) {
        if (error1) throw error;
      });
    },
  });
  
  const upload = multer({ storage: storage });


tesRoute.post("/addTestimonial",upload.single("image"),testimonialController.addTestimonial);
tesRoute.post("/updateTestimonial/:id", testimonialController.updateTestimonial);
tesRoute.get("/getTestimonial/:id", testimonialController.getTestimonial);
tesRoute.post("/deleteTestimonial/:id", testimonialController.deleteTestimonial);
tesRoute.post("/deleteAllTestimonial", testimonialController.deleteAllTestimonial);
tesRoute.post("/deleteMultipleTestimonial", testimonialController.deleteMultipleTestimonial);

module.exports = tesRoute;