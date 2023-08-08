const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Database = require('../database/database');
const db =require("../models/index");
const { Sequelize, DataTypes } = require('sequelize');
const testimonial = db.testimonial;

const res = require("express/lib/response");
const {addTestimonialValidation,updateTestimonialValidation} = require("../validations/testimonialValidation");


const addTestimonial = async (req, res) => {
    try {
      const { error } = addTestimonialValidation(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      const tes = {
        testimonialName: req.body.testimonialName,
          designation: req.body.designation,
          testimonialDescription: req.body.testimonialDescription,
          image: req.file.filename
        };
  
      const newTestimonial = await testimonial.create(tes);
      res.status(201).json(newTestimonial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getTestimonial = async (req, res) => {
    const id = req.params.id; 
    const results = await testimonial.findOne({
      where: { id: id },
      attributes: ['testimonialName','designation','testimonialDescription','image']
    });
    const response = {
      success: "true",
      Data: results,
    };
    res.status(200).send(response);
  };


  const updateTestimonial = async (req, res) => {
    try {
      const id = req.params.id; 
      const { error } = updateTestimonialValidation(req.body); 
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      const updatedTestimonial = {
        testimonialName: req.body.testimonialName,
        designation: req.body.designation,
        testimonialDescription: req.body.testimonialDescription,
      };
      const existingTestimonial = await testimonial.findOne({where: { id: id }}); 
      if (!existingTestimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
      await existingTestimonial.update(updatedTestimonial,{where:{id:id}});
      res.status(200).json(existingTestimonial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const deleteTestimonial = async (req, res) => {
    try {
      const addressId = req.params.id; 
      const existingTestimonial = await testimonial.findOne({
        where: { id: addressId }, 
        attributes: ['testimonialName','designation','testimonialDescription','image']
      });
      if (!existingTestimonial) {
        return res.status(404).json({ error: 'testimonial not found' });
      }
  
      const deleteTes=await testimonial.destroy({where: { id: addressId}});
     
      return res.status(204).json({Message:'deleted',delete:deleteTes}); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const deleteMultipleTestimonial = async (req, res) => {
    const id = req.body.id;
  
    for (let i = 0; i < id.length; i++) {
        await testimonial.destroy({where: { id: id[i]}});
    }
    return res.status(204).json({Message:'deleted'});
};

const deleteAllTestimonial = async (req, res) => {
    try {
      
      await testimonial.truncate();
     
      return res.status(204).json({Message:'deleted'}); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  module.exports = {
    addTestimonial,
    updateTestimonial,
    getTestimonial,
    deleteTestimonial,
    deleteMultipleTestimonial,
    deleteAllTestimonial
     };
    

  