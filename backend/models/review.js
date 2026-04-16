const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
    user:{
        type : mongoose.Types.ObjectId ,

        ref : "User",
        required : true ,

    },
    product :{
        type : mongoose.Types.ObjectId ,

        ref : "Product",
        required : true ,

    },
    rating : {
        type : Number,
        max : 5 , 
        min :1
    },
    comment : String , 
}, {timestamps : true })
module.exports = mongoose.model("Review" , reviewSchema)