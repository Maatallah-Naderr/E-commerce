const{body}= require('express-validator');

const productValidator = [
    body('name').notEmpty().withMessage('name is required'),
    body('description').optional(),
    body('price').isFloat({gt : 0}).withMessage("price is a float positive"),
    body('stock').isInt({min : 0}).withMessage("stock is a number positive "),
    body('category').notEmpty().withMessage("catogry required "),
     (req, res, next) => {
    console.log("🔥 PRODUCT VALIDATOR PASSED");
    next();
  }
]

module.exports = {productValidator}