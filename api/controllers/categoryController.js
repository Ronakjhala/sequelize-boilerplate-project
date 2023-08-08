const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Database = require('../database/database');
const db =require("../models/index");
const { Sequelize, DataTypes } = require('sequelize');
const category = db.category;

const res = require("express/lib/response");
const {CategoryValidation} = require("../validations/categoryValidation");

const addCategory = async (req, res) => {
  try {
    const { error } = CategoryValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const cat = {
    
        categoryName: req.body.categoryName,
        categoryType: req.body.categoryType,
      };

    const newCategory = await category.create(cat);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const viewCategory = async (req, res) => {
  const id = req.params.id; 
  const results = await category.findOne({
    where: { id: id },
    attributes: ['categoryName', 'categoryType']
  });
  const response = {
    success: "true",
    Data: results,
  };
  res.status(200).send(response);
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id; 
    const { error } = CategoryValidation(req.body); 
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const updatedCategory = {
        categoryName: req.body.categoryName,
        categoryType: req.body.categoryType,
    };
    const existingCategory = await category.findOne({where: { id: id }}); 
    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
 
    await existingCategory.update(updatedCategory,{where:{id:id}});
    res.status(200).json(existingCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const addressId = req.params.id; 
    const existingCategory = await category.findOne({
      where: { id: addressId }, 
      attributes: ['CategoryName', 'CategoryType']
    });
    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const deleteCat=await category.destroy({where: { id: addressId}});
   
    return res.status(204).json({Message:'deleted',delete:deleteCat}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const deleteAllCategory = async (req, res) => {
    try {
      
      await category.truncate();
     
      return res.status(204).json({Message:'deleted'}); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const deleteMultipleCategory = async (req, res) => {
    const id = req.body.id;
  
    for (let i = 0; i < id.length; i++) {
        await category.destroy({where: { id: id[i]}});
    }
    return res.status(204).json({Message:'deleted'});
};

module.exports = {
    addCategory,
    viewCategory,
    updateCategory,
    deleteCategory,
    deleteAllCategory,
    deleteMultipleCategory
     };
    


