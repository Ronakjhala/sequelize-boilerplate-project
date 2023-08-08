const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Database = require('../database/database');
const db =require("../models/index");
const { Sequelize, DataTypes } = require('sequelize');
const contactUs = db.contactUs;

const res = require("express/lib/response");
const {addContactValidation,updateContactValidation} = require("../validations/contactUsValidation");

const addContact = async (req, res) => {
    try {
      const { error } = addContactValidation(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      const con = {
        contactName: req.body.contactName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        message: req.body.message,
        date: req.body.date,
        };
  
      const newContactUs = await contactUs.create(con);
      res.status(201).json(newContactUs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const updateContact = async (req, res) => {
    try {
      const id = req.params.id; 
      const { error } = updateContactValidation(req.body); 
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      const updatedContact = {
        contactName: req.body.contactName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        message: req.body.message,
        date: req.body.date,
      };
      const existingContact = await contactUs.findOne({where: { id: id }}); 
      if (!existingContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      await existingContact.update(updatedContact,{where:{id:id}});
      res.status(200).json(existingContact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getContact = async (req, res) => {
    const id = req.params.id; 
    const results = await contactUs.findOne({
      where: { id: id },
      attributes: ['contactName','email','contactNumber','message','date']
    });
    const response = {
      success: "true",
      Data: results,
    };
    res.status(200).send(response);
  };

  const deleteContact = async (req, res) => {
    try {
      const addressId = req.params.id; 
      const existingContact = await contactUs.findOne({
        where: { id: addressId }, 
        attributes: ['contactName','email','contactNumber','message','date']
      });
      if (!existingContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
  
      const deleteCon=await contactUs.destroy({where: { id: addressId}});
     
      return res.status(204).json({Message:'deleted',delete:deleteCon}); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const deleteMultipleContact = async (req, res) => {
    const id = req.body.id;
  
    for (let i = 0; i < id.length; i++) {
        await contactUs.destroy({where: { id: id[i]}});
    }
    return res.status(204).json({Message:'deleted'});
};

const deleteAllContact = async (req, res) => {
    try {
      
      await contactUs.truncate();
     
      return res.status(204).json({Message:'deleted'}); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    addContact,
    updateContact,
    getContact,
    deleteContact,
    deleteMultipleContact,
    deleteAllContact
  }