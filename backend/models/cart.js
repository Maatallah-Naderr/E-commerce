const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref : "User",
        required : true ,
        unique : true , 
    }
}, {timestamps : true })
module.exports = mongoose.model("Cart", cartSchema)