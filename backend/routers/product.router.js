const express = require('express');
const routerProduct= express.Router();
const upload = require("../middlewars/upload");
const {createProduct,updateProduct, getAllProduct, getOneProduct, deleteProduct,getProductByCategory}=require('../controllers/product.controller')
const {productValidator}= require("../validator/productValidator")
const {isAdmin} = require('../middlewars/auth.middlewear')
const {productValidate}= require('../middlewars/product.middlwear')
const {validate,  protect} = require("../middlewars/auth.middlewear")
////router Admin 
routerProduct.post('/add',protect,isAdmin,upload.single('image'),productValidator,validate, createProduct )
routerProduct.patch('/update/:id',protect,isAdmin,productValidate,validate, updateProduct)
routerProduct.delete('/delete/:id', protect,isAdmin,deleteProduct)
/////router user
routerProduct.get('/all', getAllProduct);
routerProduct.get('/oneProduct/:id', getOneProduct)
routerProduct.get('/byCategory/:id',getProductByCategory)
module.exports = routerProduct ;