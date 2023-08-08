const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Database = require('../database/database');
const db =require("../models/index");
const { Sequelize, DataTypes } = require('sequelize');
const AddressBook = db.addressBook;
const res = require("express/lib/response");
const {addAddressValidation,updateAddressValidation} = require("../validations/addressBookValidation");

const addAddress = async (req, res) => {
  try {
    const { error } = addAddressValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const address = {
      title: req.body.title,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      pinCode: req.body.pinCode,
    };

    const newAddress = await db.addressBook.create(address);
    res.status(201).json(newAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const viewAddress = async (req, res) => {
  const id = req.params.id; 
  const results = await db.addressBook.findOne({
    where: { id: id },
    attributes: ['title', 'addressLine1', 'addressLine2', 'country', 'state', 'city', 'pinCode']
  });
  const response = {
    success: "true",
    Data: results,
  };
  res.status(200).send(response);
};

const updateAddress = async (req, res) => {
  try {
    const id = req.params.id; 
    const { error } = updateAddressValidation(req.body); 
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const updatedAddress = {
      title: req.body.title,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      pinCode: req.body.pinCode,
    };
    const existingAddress = await db.addressBook.findOne({where: { id: id }}); 
    if (!existingAddress) {
      return res.status(404).json({ error: 'Address not found' });
    }
 
    await existingAddress.update(updatedAddress,{where:{id:id}});
    res.status(200).json(existingAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id; 
    const existingAddress = await db.addressBook.findOne({
      where: { id: addressId }, 
      attributes: ['title', 'addressLine1', 'addressLine2', 'country', 'state', 'city', 'pinCode']
    });
    if (!existingAddress) {
      return res.status(404).json({ error: 'Address not found' });
    }

    const deleteAdd=await db.addressBook.destroy({where: { id: addressId}});
   
    return res.status(204).json({Message:'deleted',delete:deleteAdd}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
    addAddress,
    viewAddress,
   deleteAddress,
   updateAddress,
     };
    


