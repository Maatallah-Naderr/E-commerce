const {body}= require('express-validator')
const User = require("../models/user.model")
const registerValidate =()=>[
    body("name").isString()
    .notEmpty().withMessage("name is required"),
    body("email").notEmpty()
    .withMessage("email required")
    .isEmail().withMessage("enter valid email")
    .custom(async (email)=>{
        const user = await User.findOne({email});
        if(user){
            throw new Error("email already exist")
        }
        return
        

    }),
    body('password').notEmpty().withMessage("password required")
    .isLength({min:6}).withMessage("Password must be at least 5 characters long ")
    

]


const loginValidate = ()=>[
    body("email").notEmpty()
    .withMessage("email required"),
    body("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({min : 6})
    .withMessage("password must be at least 6 characters long")

]





module.exports= {registerValidate , loginValidate}