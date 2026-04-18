const express = require('express');
const routerCategory = express.Router();
const upload = require("../middlewars/upload")
const {createCategory,getAllCategory, getOneCategory}= require('../controllers/category');
const {isAdmin, validate, protect} = require("../middlewars/auth.middlewear")
const {categoryValidator}= require('../validator/categoryValidator')
routerCategory.post('/add',
     protect 
     ,isAdmin,upload.single("image"),
     categoryValidator,validate,createCategory);
// routerCategory.post('/add',protect, createCategory);
routerCategory.get('/all', getAllCategory);
routerCategory.get('/getOneCategory/:id' , getOneCategory);



module.exports = routerCategory;