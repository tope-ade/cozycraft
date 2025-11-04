
const Product = require('../models/Product');
const { findById } = require('../models/User');

exports.getAllProducts = async (req,res) => {
  try {
    const products = await Product.find().sort({createdAt: -1});
    res.json(products);
    
  } catch (err) {
    console.error('Error fetching products:', err)
    res.status(500).json({
      message : 'server error'
    });
  }
};

exports.getProductById = async (req,res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
    return res.status(404).json({
     message : 'Product not found'
    });
    }
    res.json(product);
    
  } catch (err) {
    console.error('Error fetching product:', err)
    res.status(500).json({
      message : 'server error'
    });
  }
};

//protected route -create
exports.createProduct = async (req,res) => {
  try {
    const {name, category, price, description, imageUrl} =req.body;
    if (!name || !category || !price) {
      return res.status(400).json({
        message: 'Name, category and price are required'
      });
    }
    const product = new Product({name, category, price, description, imageUrl});
    await product.save();
    res.status(200).json({
      message: 'Product created successfully'
    });

  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({
      message : 'Server error'
    });
  }
};

//protected route - delete
exports.deleteProduct = async (req,res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    res.json({
        message: 'Product deleted successfully',
        deletedProduct : product
      });

  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({
      message : 'Server error'
    });
  }
}; 