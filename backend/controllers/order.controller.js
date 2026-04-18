const Cart = require("../models/cart");
const cartItem = require("../models/cartItem");
const Order = require("../models/order");
const Product =require("../models/product")
// 1. récupérer cart
// 2. récupérer CartItems
// 3. vérifier stock
// 4. calculer total
// 5. créer Order
// 6. vider CartItem

const confirmOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "cart not found " });
    }
    const cartItems = await cartItem
      .find({ cart: cart._id })
      .populate("product");
    console.log(cartItems);
    if (!cartItems) {
      return res.status(404).json({ message: "cart not found " });
    }
    if (cartItems.length === 0) {
      return res.status(400).json({ success: true, message: "cart is empty " });
    }
    let totalPrice = 0;
    const items = cartItems.map((item) => {
      totalPrice += item.quantity * item.product.price;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });
    for (let item of cartItems) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `not enough stock for product ${item.product.name}`,
        });
      }
    }
    for (let item of cartItems) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }
    const order = await Order.create({
      user: userId,
      items,
      totalPrice,
    });
    await cartItem.deleteMany({ cart: cart._id });
    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("REQ USER:", req.user._id);
    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: "my orders fetched successfully",
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById({ orderId });
    if (!order) {
      return res.status(404).json({
        message: "order not found ",
      });
    }
    if (order.user.toString() !== req.user.toString()) {
      return res.status(403).json({
        success: false,
        message: "access denied ",
      });
    }
    return res.status(200).json({
      success: true,
      message: "order fetched successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const updateStatusOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "order not found " });
    }
    const validStatus = [
      "pending ",
      "paid",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "invalid status ",
      });
    }
    order.status = status;
    order.save();
    return res.status(200).json({
      message: "status order updated with success ",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error updating status ",
      error: error.message,
    });
  }
};
const cancelledOrder = async (req, res) => {
  try {

    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found ",
      });
    }
    console.log("ORDER STATUS:", order.status);
    if (order.status === "delivered") {
      return res
        .status(400)
        .json({
          success: false,
          message: "can not cancelled order delivered ",
        });
    }
    if(order.status ==="cancelled"){
      return res.status(400)
      .json({message:"order already cancelled "})
    }
    for(item of order.items){
      const product = await Product.findById(item.product);
      if(product){
        product.stock+=item.quantity;
       await product.save()

      }
    }
   order.status="cancelled";
   await order.save();
   return res.status(200)
   .json({
    success :true,
    message : "order cancelled with success",
    order
   })
  } catch (error) {
    return res.status(500).json({
      message: "error cancelled order",
      error: error.message,
    });
  }
};
module.exports = { confirmOrder, getMyOrders, getOneOrder, updateStatusOrder , cancelledOrder};
