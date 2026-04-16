const Category = require("../models/category")
const mongoose = require('mongoose');

///////create a  new category

const createCategory = async(req, res)=>{
    const {name , description , slug , isActive , image } = req.body;

    try{
      const existingCategory = await Category.findOne({name});
      if(existingCategory){
        return res.status(400).json({ message : 'category already existing '})
      }
      const category = await Category.create({
    
        name , description , slug , isActive , image 
      })  
      return res.status(201).json({
        sucess: true ,
        message:'category created with success',
        data : category 
      }) 

    }catch(error){
        return res.status(500).json({ message : error.message })
    }

}
///////get all category //////////
const getAllCategory= async(req, res)=>{
 
    try{
        const categories = await Category.find({isActive : true });
        return res.status(200).json({
            sucess : false , 
            data : categories
        })

    }catch(error){
         return res.status(500).json({success : false , message : error.message })

    }


}
/////getone category 
const getOneCategory = async(req, res)=>{
  const {id }= req.params; 
  try{
    const category = await Category.findById(id);
    if(!category){
     return res.status(404).json({ success : false, message : "category not found"})
    }
    return res.status(200).json({sucess : true , data : category})
  }catch(error){
   return res.status(500).json({ success : false,message : error.message})
  }
}
const deleteCategory = async(req, res)=>{
  const {id}= req.params;
  try{
const category = await Category.findByIdANdUpdate(id , {isActive : false }, {new : true});
if(!category){
  return res.json({success : false , message : "category ot found"})
}
return res.status(200).json({sucess : true , message : 'category desactived with sucess'})
  }catch(error){
    return res.status(500).json({ success : false ,message : error.message})
  }
}

module.exports = {createCategory,getAllCategory, getOneCategory ,deleteCategory}

























