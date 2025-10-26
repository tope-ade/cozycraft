
const express = require('express');
const router = express.Router();
const {getAllProducts, getProductById, createProduct, deleteProduct} = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');

//public
router.get('/', getAllProducts);
router.get('/:id', getProductById);

//protected
router.post('/', auth, createProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;