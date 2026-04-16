const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");

const Product = require("../models/product");

const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    if (quantity < 0) {
      return res
        .status(400)
        .json({ success: false, message: "quantity must be positive number" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId });
      cart.save();
    }
    let cartItem = await CartItem.findOne({
      cart: cart._id,
      product: productId,
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new CartItem({
        cart: cart._id,
        product: productId,
        quantity: quantity,
      });
    }

    await cartItem.save();
    return res
      .status(200)
      .json({ success: true, message: "product added with success " });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCartUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          user: null,
          items: [],
        },
      });
    }
    const cartItems = await CartItem.find({ cart: cart._id }).populate(
      "product",
    );
    return res.status(200).json({
      success: true,
      cart: {
        id: cart._id,
        user: cart.user,
        items: cartItems,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const removeItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return  res.status(404).json({
        success: false,
        message: "cart not found",
      });
    }
    const cartItem = await CartItem.findOne({cart:cart._id , product : productId});
    if(!cartItem){
       return  res.status(404)
        .json({success : false , message: 'product is not in cart '})
    }
    await CartItem.findByIdAndDelete(cartItem._id) ; 
    return res.status(200).json({
        success : true , 
        message : "product removed from cart with success"
    })

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { addToCart, getCartUser, removeItem };
