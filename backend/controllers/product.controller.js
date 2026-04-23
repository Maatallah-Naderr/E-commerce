const Product = require("../models/product");
const Category = require("../models/category");
const createProduct = async (req, res) => {
  const { name, description, stock, category, price } = req.body;
  if (!name || !stock || !price) {
    return res.status(400).json({
      success: false,
      message: "all fields are required ",
    });
  }

  try {
    const categoryExist = await Category.findById(category);
    if (!categoryExist) {
      return res.status(400).json({
        success: false,
        message: "this category not exist ",
      });
    }
    const product = await Product.create({
      name,
      description,
      stock,
      category,
      price,
    });
    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, category, price } = req.body;
  try {
    if (category) {
      const categoryExist = await Category.findById(category);
      if (!categoryExist || !categoryExist.isActive) {
        return res
          .status(404)
          .json({ success: false, message: "category not exist " });
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, stock, category, price },
      { new: true, runValidator: true },
    );
    return res
      .status(200)
      .json({
        success: true,
        message: "product is update with success",
        data: product,
      });
  } catch (error) {
    return res.status(500).json({ success: false, massage: error.message });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, massage: error.message });
  }
};
const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("category", "name");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found " });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ sucess: false, massage: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id).populate(
      "category",
      "name",
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found " });
    }
    return res
      .status(200)
      .json({ success: true, message: "product delete successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, massage: error.message });
  }
};
const getProductByCategory = async(req,res)=>{
    try{
    const {id}= req.params;
    const products = await Product.find({category: id});
    console.log(products)
    return res.status(200).json({
        success :true,
        data: products,
    })
console.log("ID",id)
    }catch(error){
       return res.status(500).json({ success: false, massage: error.message });  
    }
}
module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  getOneProduct,
  deleteProduct,
  getProductByCategory
};
