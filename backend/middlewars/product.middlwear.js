const {validationResult}=require('express-validator');

const productValidate = (req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({
      success: false,
      message: errors.array(),
    });
    }
}
module.exports = {productValidate}
