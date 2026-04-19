const express = require('express');
const routerCategory = express.Router();
const upload = require("../middlewars/upload")
const {createCategory,getAllCategory, getOneCategory,updateCategory}= require('../controllers/category');
const {isAdmin, validate, protect} = require("../middlewars/auth.middlewear")
const {categoryValidator,updateCategoryValidator}= require('../validator/categoryValidator')
routerCategory.post('/add',
     protect 
     ,isAdmin,upload.single("image"),
     categoryValidator,validate,createCategory);
// routerCategory.post('/add',protect, createCategory);
routerCategory.get('/all', getAllCategory);
routerCategory.get('/getOneCategory/:id' , getOneCategory);

routerCategory.put('/update/:id',protect,isAdmin,upload.single("image"),updateCategoryValidator,validate,updateCategory)

module.exports = routerCategory;