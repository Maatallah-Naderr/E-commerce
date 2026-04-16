const mongoose = require('mongoose'); 
 const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,

    },
    description : String, 
    price : {
        type : Number , 
        min : 0,
        required : true 
        
    },
    stock : {
     type : Number,
     min : 0 , 
     default : 0,
     required : true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        
        required :true

    },
 }, {timestamps : true })

 module.exports = mongoose.model("Product" , productSchema)