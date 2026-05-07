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
    }, 
    price:{
        type: Number,
        required:true,
    }, 
    total :{
        type: Number ,
        required : true,
    }
}, {timestamps : true })

module.exports = mongoose.model("CartItem", cartItemSchema)