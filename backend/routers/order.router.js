const express = require('express');
const routerOrder= express.Router();
const {isAdmin} = require('../middlewars/auth.middlewear')

const {validate,  protect} = require("../middlewars/auth.middlewear")
const {confirmOrder,getMyOrders, getOneOrder}=require("../controllers/order.controller")

routerOrder.post('/confirm', protect,confirmOrder);
routerOrder.get('/getMyOrder', protect,getMyOrders);
routerOrder.get('/getOrder', protect, getOneOrder)
module.exports = routerOrder;