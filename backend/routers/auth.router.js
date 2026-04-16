const express = require('express'); 
const router = express.Router();
const {registerUser, loginUser, updateUser ,deleteUser}=require("../controllers/auth.controller") ;
const{registerValidate , loginValidate }= require("../validator/userValidator")
const {validate ,protect} = require("../middlewars/auth.middlewear")

const {productValidate} = require("../middlewars/product.middlwear")
router.post('/register' ,registerValidate(),validate, registerUser)
router.post('/login', loginValidate() , validate,loginUser )
router.patch('/update/:id' ,  protect, updateUser)
router.delete('/admin/delete/:id', protect , deleteUser)
/////////////////////admin router product///////////////



module.exports = router ;