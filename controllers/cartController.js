
const Cart = require('../models/Cart');
const logger = require('../config/logger');


//add item to cart
exports.addToCart = async (req, res) => {
  try {
    const {userId, productId, quantity} = req.body;
    const qty = Number(quantity) || 1

    let cart = await Cart.findOne({userId});

    if (!cart) {
      cart = new Cart({userId, items: [{productId, quantity: qty}]})
    } else {
      const existingItem = cart.items.find((item) => 
        item.productId.toString() === productId.toString()); 
      if (existingItem) {
        existingItem.quantity += qty;
      }
      else {
        cart.items.push({productId, quantity: qty});
      }
    }

    await cart.save();
    console.log({cart})
    logger.info(`Added product ${productId} to cart for user ${userId}`)
    res.status(200).json({success: true, cart});

  } catch (err) {
    logger.error(`Error adding to cart, ${err.message}`)
    res.status(500).json({success: false,  message:'server error'})
  }
};

//get cart
exports.getCart = async (req, res) => {
  try {
    const {userId} = req.params
    const cart = await Cart.findOne({userId}).populate('items.productId')

    if(!cart) {
      return res.status(404).json({success: false, message: 'Cart not found'});
    }

    res.status(200).json({success: true, cart});

  } catch (err) {
    logger.error(`Error fetching product, ${err.message}`)
    res.status(500).json({success: false, message: 'server error'})
  }
}

//update quantity
exports.updateCartItem = async (req, res) => {
  try {
    const {userId, productId, quantity} = req.body;
    const cart = await Cart.findOne({userId});
    const qty = Number(quantity);

    if(!cart) {
      return res.status(404).json({success: false, message: 'Cart not found'});
    }

    const item = cart.items.find((item) => item.productId.toString() === productId.toString());
    if (!item) {
      return res.status(404).json({success: false, message: 'Item not found'});
    }

    item.quantity = qty;
    await cart.save();
    
    res.status(200).json({success: true, cart})
  } catch (err) {
    logger.error(`Error updating quantity, ${err.message}`)
    res.status(500).json({success: false, message: 'server error'});
  }
}

//remove item
exports.removeCartItem = async (req, res) => {
  try {
    const {userId, productId} = req.body;
    const cart = await Cart.findOne({userId});

    if (!cart) {
      return res.status(404).json({success: false, message: 'Cart not found'});
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId.toString());

    await cart.save();
    res.status(200).json({success: true, cart});

  } catch (err) {
    logger.error(`Error removing item, ${err.message}`)
    res.status(500).json({success: false, message: 'server error'})
  }
}

// clear cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Empty the items array
    cart.items = [];

    await cart.save();

    res.status(200).json({ success: true, message: 'Cart cleared', cart });

  } catch (err) {
    logger.error(`Error clearing cart, ${err.message}`);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
