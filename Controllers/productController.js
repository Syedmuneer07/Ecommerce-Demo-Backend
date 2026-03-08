
const Product = require('../models/Product');
const Category = require('../models/Category');

exports.createProduct = async (req, res, next) => {
    try {
        const {title, description, mrpPrice, discountedPrice, categoryId, inStock, images, rating, numOfReviews, isActive} = req.body;
        if(!req.user.isAdmin) return res.status(401).json({ message: "You are not authorized to create a product, only admin can create a product" }); 
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const product = new Product({ title, description, mrpPrice, discountedPrice, categoryId, inStock, images, rating, numOfReviews, isActive });
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
        next(err);
    }
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const filter = {};

        if(req.query.categoryId) filter.categoryId = req.query.categoryId;

        const products = await Product.find(filter);

        if(products.length === 0) return res.status(404).json({ message: "Products not found" });
        if (!products) {
            return res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json({ message: "Products found", products });
    } catch (err) {
        next(err);
    }
}
exports.getProduct = async (req, res, next) => {
    
    try{
        const {id}=req.params;
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product found", product });
    }catch(err){
        next(err);
    }
}

exports.updateProduct= async(req, res, next) => {
    try{
       
        const {id}=req.params;
       
        const {title, description, mrpPrice, discountedPrice, categoryId, inStock, images, rating, numOfReviews, isActive} = req.body;

        if(!req.user.isAdmin) return res.status(401).json({ message: "You are not authorized to update a product, only admin can update a product" });

        const product = await Product.findByIdAndUpdate(id,{title, description, mrpPrice, discountedPrice, categoryId, inStock, images, rating, numOfReviews, isActive},{new:true });

        if(!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product updated successfully", product });

    }catch(err){
        next(err);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try{
        const {id}=req.params;

        if(!req.user.isAdmin) return res.status(401).json({ message: "You are not authorized to delete a product, only admin can delete a product" });

        const product = await Product.findByIdAndDelete(id);

        if(!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully", product });

    }catch(err){
        next(err);
    }
};
