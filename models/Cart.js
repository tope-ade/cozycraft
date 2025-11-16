
const mongoose = require('mongoose');


//each cartitems 
const cartItemSchema = new mongoose.Schema({
  productId: {type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true},
  quantity: {type: Number, default: 1, required: true}
});

//entire cart
const cartSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  items: [cartItemSchema],
  updatedAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Cart', cartSchema)
