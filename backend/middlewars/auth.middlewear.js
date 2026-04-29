const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model')
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }
  next();
};

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: "token invalid ou token expired" });
    
  }
  try{
      const decoded = jwt.verify(token , process.env.SECRET);
      console.log("decoded",decoded)
  
  req.user = await User.findById(decoded.id).select("-password")
  next()
  }catch(error){
     console.log("JWT ERROR:", error.message);
res.status(401).json({success : false , message : "token invalid "})
  }


    
};

// const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//      console.log("AUTH HEADER RAW:", req.headers.authorization);

//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided"
//       });
//     }

//   const token = authHeader.replace("Bearer", "").trim();

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token missing"
//       });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET);

//     const user = await User.findById(decoded._id).select("-password");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     req.user = user;
//     next();

//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "token invalid ou token expiret"
//     });
//   }
// };


const isAdmin =(req, res, next)=>{
    if( req.user?.role ==="admin"){
        next()
    }else
        return res.status(403).json({success :false , message : "only admin "})

}


module.exports = {isAdmin, validate, protect };
