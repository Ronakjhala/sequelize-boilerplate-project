const express = require("express");
const userRoute = express();
const bodyParser = require("body-parser");
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
const path = require("path");
userRoute.use(express.static("public"));
var passport=require("passport");
require('../validations/passAuth')(passport)

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
const userControllers = require("../controllers/userController");
const auth = require('../validations/Authentication');

userRoute.post("/register",upload.single("image"),userControllers.registerUser);
userRoute.post("/login", userControllers.userLogin);
userRoute.post("/resetPassword", userControllers.resetPassword);
userRoute.get("/viewProfile",passport.authenticate('jwt',{session: false}), userControllers.viewProfile);
userRoute.post("/updateProfile", userControllers.UpdateProfile);

module.exports = userRoute;
