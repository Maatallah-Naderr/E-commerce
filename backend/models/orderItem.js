const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
    order : {
        type : mongoose.Types.ObjectId ,
        ref:'Order',
        required : true ,

    },
    product : {
        type: mongoose.Types.ObjectId , 
        ref : 'Product', 
        required : true 
    },
    quantity : {
        type : Number, 
        default : 1,
        required : true ,
    }

},{timestamps : true })