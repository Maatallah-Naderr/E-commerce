const express = require('express');
const cartRouter = express.Router();
const {addToCart, getCartUser, removeItem} = require('../controllers/cart.controller');
const {isAdmin, validate, protect} = require("../middlewars/auth.middlewear")


cartRouter.post('/addToCart',protect,addToCart);
cartRouter.get('/getCart', protect, getCartUser);
cartRouter.delete('/removeItem',protect ,removeItem)








module.exports = cartRouter;