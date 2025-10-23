
const product = require('../models/Product');
const { findById } = require('../models/User');

exports.getAll = async (req,res) => {
  try {
    const products = await Product.find().sort({created: -1});
    res.json(products);
    
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message : 'server error'
    });
  }
};

exports.getOne = async (req,res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p)
    return res.staus(404).json({
     message : 'Not found'
    });
    res.json(p);
    
  } catch (err) {
    console.error(err)
    res.ststus(500).json({
      message : 'server error'
    });
  }
};