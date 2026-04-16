const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim : true,
     minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim : true
  },
  password: {
    type: String,
    required: true,
    select: false, /// don't return password
  },
  role: {
    type : String,
    enum:["admin","user"],
    default: "user",
  },

  
},
{timestamps: true,}
);


module.exports = mongoose.model("User", userSchema);
