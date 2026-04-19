const Category = require("../models/category")
const mongoose = require('mongoose');
const path = require('path');
const fs = require("fs")
///////create a  new category

const createCategory = async(req, res)=>{
    const {name , description , slug , isActive  } = req.body;

    try{
      const existingCategory = await Category.findOne({name});
      if(existingCategory){
        return res.status(400).json({ message : 'category already existing '})
      }
      const imagePath = req.file ? req.file.path : null;
      const category = await Category.create({
    
        name , description , slug , isActive , imagePath 
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
const category = await Category.findByIdAndUpdate(id , {isActive : false }, {new : true});
if(!category){
  return res.status(404).json({success : false , message : "category ot found"})
}
return res.status(200).json({sucess : true , message : 'category desactived with sucess'})
  }catch(error){
    return res.status(500).json({ success : false ,message : error.message})
  }
}
const updateCategory = async(req, res)=>{
  try{
    const {id}= req.params;
    const {name,description, slug, isActive }= req.body;
    const category = await Category.findById(id);
    if(!category){
      return res.status(404).json({success: false , message:"category not found "})
    }
    if(req.file){
      if(category.image){
        const oldImagePath = path.join(__dirname,"..",category.image)
        if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath); // 🔥 sync = plus simple ici
    }
        
      }
      category.image=req.file.path;
    }
    if(name) category.name= name;
    if(description)category.description=description;
    if(slug)category.slug= slug;
    if(isActive !== undefined) category.isActive=isActive
     const updatedCategory = await category.save()
    return res.status(200)
    .json({
      success: true,
      message : "category updated with success",
      data : updatedCategory


    })

  }catch(error){
    return res.status(500).json({ success : false,message : error.message})
  }
}

module.exports = {createCategory,getAllCategory, getOneCategory ,deleteCategory, updateCategory}

























