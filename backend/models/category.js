const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type :String, 
        required: true , 
        trim : true , 
        unique : true,
        lowercase: true,

    
    }, 
    slug: {
        type : String,
        required: true,
        unique : true,
    },
    description : {
        type: String ,
        default: null,
    }, 
    isActive :{
        type : Boolean ,
        default: true
    }, 
    image : String,
}, {timestamps: true })

module.exports = mongoose.model("Category" , categorySchema)