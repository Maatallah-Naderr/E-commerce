const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref:'User',
        required: true ,

    },
    items:[{
        product : {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity : {
            type : Number,
            required:true,

        },
        price:{
            type: Number,
            required: true ,
        }
    }

    ],
    totalPrice : Number,
    status:{
        type : String,
        enum: ["pending", "paid", "shipped", "delivered"],
        default : "pending"
    }
       

    
},{timestamps : true })
module.exports = mongoose.model("Order" , orderSchema )