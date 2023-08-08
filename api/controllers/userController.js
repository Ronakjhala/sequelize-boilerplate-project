const db =require("../models/index");
const Database=require('../database/database');
const { Sequelize, DataTypes } = require('sequelize');
const User = db.User;
const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { sendEmail } = require("../helpers/email");
const res = require("express/lib/response");
const {
  registrationValidation,
  updateValidation,
  resetPasswordValidation,
  loginValidation,
} = require("../validations/userValidation");


const createToken = async (id, email) => {
  try {
    const payload = { _id: id, email: email }; 
    return await jwt.sign(payload, config.secret_jwt);
  } catch (error) {
    throw error;
  }
};


const securePassword = async (password) => {
  try {
    const passwordHash = bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const registerUser = async (req, res) => {

    const { error } = registrationValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const sPassword = await securePassword(req.body.password);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: sPassword,
      gender: req.body.gender,
      image: req.body.filename,
    };
console.log(user);
    const users =await User.create(user);
res.status(200).send(users);
};

const userLogin = async (req, res) => {
 
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const email = req.body.email;
    const password = req.body.password;
const results=await User.findOne({where:{email:email}})
   console.log(results.password);
            const passwordMatch = await bcrypt.compare(password,results.password );

            console.log(results.email);
            if (passwordMatch) {
              const tokenData = await createToken(results.id, results.email);
     
              res.status(200).json({token:tokenData,message:"login successfully"});
            } else {
              res.send("error");
            }
};

const resetPassword = async (req, res) => {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    const { error } = resetPasswordValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect old password',
        });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await user.update({
        password: hashedNewPassword,
      });
      return res.status(200).json({
        success: true,
        message: 'Password reset successful',
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'An error occurred' });
    }
  };
  

const viewProfile = async (req, res) => {
const email = req.body.email;
 const results=await User.findOne({where:{email:email},attributes: ['firstName', 'lastName','email','gender','image']
  });
  const response = {
 success: "true",
Data: results,
};
res.status(200).send(response);
   
};

const UpdateProfile = async (req, res) => {

const { email, firstName, lastName, gender } = req.body;
 const { error } = updateValidation(req.body);
    
if (error) {
    return res.status(400).send(error.details[0].message);
}
const updateResult=await User.update(req.body,{where:{email:email}});
const response = {
count: 1,
 success: "true",
 message: "Update successful",
};
res.status(200).send(response);
};

module.exports = {
registerUser,
 userLogin,
resetPassword,
viewProfile,
UpdateProfile,
 };
