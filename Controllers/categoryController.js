const Category = require("../models/Category");
 
exports.createCategory = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        

        if(!title || !description) return res.status(400).json({ message: "Title and description are required" });
        
        if(!req.user.isAdmin) return res.status(401).json({ message: "You are not authorized to create a category, only admin can create a category" });
        const category = new Category({ title, description });
        await category.save();
        res.status(201).json({ message: "Category created successfully", category });
    } catch (err) {
        next(err);
    }
};

exports.getCategory = async (req, res, next) => {
    try{
        const { id } = req.params;
        const category = await Category.findById(id);

        if(!category) return res.status(404).json({ message: "Category not found" });

        res.status(200).json({ message: "Category found", category });
    }catch(err){
        next(err);
    }
}

exports.getAllCategories = async (req, res, next) => {
    try{
        
        const categories = await Category.find();
        if(!categories) return res.status(404).json({ message: "Categories not found" });

        res.status(200).json({ message: "Categories found", categories });
    }catch(err){
        next(err);
    }
}

exports.updateCategory = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { title, description,isActive } = req.body;

        if(!req.user.isAdmin) return res.status(401).json({ message: "You are not authorized to update a category, only admin can update a category" });

        const category = await Category.findByIdAndUpdate(id,{title,description,isActive},{new:true });
        if(!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "Category updated successfully", category });
    }catch(err){
        next(err);
    }
};


// Delete a category only by admin
exports.deleteCategory = async (req, res, next) => {
    try{
        const { id } = req.params;
        if(!req.user.isAdmin) return res.status(401).json({ message: "You are not authorized to delete a category, only admin can delete a category" });
        const category = await Category.findByIdAndDelete(id);
        if(!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "Category deleted successfully", category });
    }catch(err){
        next(err);
    }
}
