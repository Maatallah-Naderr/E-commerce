const express = require('express');
const cartRouter = express.Router();
const {addToCart, getCartUser, removeItem, incriseQuantity , decriseQuantity } = require('../controllers/cart.controller');
const {isAdmin, validate, protect} = require("../middlewars/auth.middlewear")


cartRouter.post('/addToCart',protect,addToCart);
cartRouter.get('/getCart', protect, getCartUser);
cartRouter.delete('/removeItem/:productId',protect ,removeItem)
cartRouter.patch('/incrise/:productId',protect,incriseQuantity)
cartRouter.patch('/decrise/:productId',protect,decriseQuantity)







module.exports = cartRouter;