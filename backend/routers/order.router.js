const express = require('express');
const routerOrder= express.Router();
const {isAdmin} = require('../middlewars/auth.middlewear')

const {validate,  protect} = require("../middlewars/auth.middlewear")
const {confirmOrder,getMyOrders, getOneOrder,updateStatusOrder,cancelledOrder,getAllOrders}=require("../controllers/order.controller")

routerOrder.post('/confirm', protect,confirmOrder);
routerOrder.get('/getMyOrder', protect,getMyOrders);
routerOrder.get('/getAllOrder',protect,isAdmin,getAllOrders)
routerOrder.get('/getOrder', protect, getOneOrder)
routerOrder.patch('/:id/status', protect,isAdmin,updateStatusOrder )
routerOrder.patch('/:id/cancel',protect,isAdmin,cancelledOrder)
module.exports = routerOrder;