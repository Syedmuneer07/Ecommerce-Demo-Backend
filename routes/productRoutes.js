const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../Controllers/productController');

router.get('/list',authMiddleware, getAllProducts);
router.get('/:id',authMiddleware,getProduct);
router.post('/create',authMiddleware, createProduct);
router.put('/:id',authMiddleware,    updateProduct);
router.delete('/:id',authMiddleware, deleteProduct);



module.exports = router;