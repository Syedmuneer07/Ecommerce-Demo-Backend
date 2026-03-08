const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const { createCategory, getCategory, updateCategory, deleteCategory, getAllCategories } = require('../Controllers/categoryController');

router.get('/list',authMiddleware, getAllCategories);
router.get('/:id',authMiddleware,getCategory);
router.post('/create',authMiddleware, createCategory);
router.put('/:id',authMiddleware,    updateCategory);
router.delete('/:id',authMiddleware, deleteCategory);



module.exports = router;
