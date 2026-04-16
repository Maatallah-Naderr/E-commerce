const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
    cart : {
        type : mongoose.Types.ObjectId ,
        ref : "Cart",
        required : true ,
    },
    product : {
        type : mongoose.Types.ObjectId,
        ref: "Product",
        required : true ,

    },
    quantity : {
        type : Number , 
        required : true  , 
        default : 1
    }
}, {timestamps : true })

module.exports = mongoose.model("CartItem", cartItemSchema)