const User = require("../models/user.model");
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')
const registerUser = async(req , res)=>{

    ///check fildes
   const {name , email , password , role }= req.body ;
   if(!name || !email || !password){
    return res.status(400).json({
        success : false, 
        message :  "all fileds are required" 
    })
        
    }
   try{
    ////chek if user exist by email
    const existingUser = await User.findOne({email}) ;
    if(existingUser){
     return  res.status(409).json({success : false , message :"user already exist" , data : null })
    }
   const hashedPassword = await bcrypt.hash(password , 10) ; 
   const  user = new User({
    name : name,
    email: email,
    password : hashedPassword ,
    role: role ||"user"
   })
    await user.save();
    let token =generateToken(user._id) ;
    return res.status(201).json({success : true , 
    message : "user added with success",
    data : {
        name ,
        email,
       role : role || 'user', token
    }
   })
    
    

   }catch(error){
    res.status(500).json(error.message )
   } 
}
const loginUser= async(req , res)=>{
  const {email , password}= req.body ; 
  if(!email||!password){
    return res.status(400).json({success :false , message: "all fields are required"})

  }
  try{
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.status(404).json({success : false , message : "user not found"})
    }
    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
        return res.status(401)
        .json({success : false ,
         message : "password or email are wrnong"})
    }
    let token = generateToken(user._id)
    return res.status(200)
    .json({
        success : true,
        message : "login with success",
        data:{
            id : user._id ,
            name:user.name,
            email: user.email, 
            role : user.role, 
            token
        }
    })

  }catch(error){
    res.status(500).json({success: false , message : error.message} );
    
  }



}

const updateUser= async (req, res)=>{
const {id}=req.params ;
const {email , name}= req.body ; 
try{
  if(req.user._id.toString() !== id && req.user.role ==="admin"){
    res.status(403).json({
      success : false ,
      message  : 'not authaurize'
    })
  }
  const existingUser = await User.findOne({email})
  if(existingUser && existingUser._id.toString() !== id)
    return res.status(400).json({
   success : false ,
   message : "email already exist "


  })
  const fields= {};
  if(name) fields.name = name ;
  if(email) fields.email = email;
  const user = await User.findByIdAndUpdate(id , {$set : fields}, {new : true , runValidator : true})
  if(!user)
    return res.status(404).json({
  success : false ,
  message : "user not found "
  
    })
    res.status(200).json({
      success : true ,
      message : "user updated with success",
      data : {
        id : user._id,
        name: user.name ,
        email:user.email ,
        role: user.role 
      }
    })


}catch(error){
  res.status(500).json({
    success : false , 
    message: error.message,
  })
}


}
const deleteUser = async (req , res )=>{
  const {id }= req.params ; 
  try{
    if(req.user._id.toString() !== id && req.user.role !=="admin"){
      return res.status(403).json({
        success : false,
        message : "not authorize"
      })
    }
    const user = await User.findByIdAndDelete(id);
    if(!user){
      return res.status(404).json({
        success : false , 
        message : 'user not found '
      })
    }
    return res.status(200).json({
      success : true,
      message : "user delete with success"
    })

  }catch(error){
    res.status(500).json({
      success : false ,
      message : error.message
    })

  }


}
module.exports = {registerUser , loginUser , updateUser , deleteUser}