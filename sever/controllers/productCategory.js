const ProductCategory = require('../model/productCategory')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async (req, res) => {
    try {
        const response = await ProductCategory.create(req.body);
        res.json({
            success: true,
            createdCategory: response
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Cannot create new product category',
            error: error.message
        });
    }
});
const getCategories = asyncHandler(async(req, res) => {
    const response = await ProductCategory.find().select('title _id')
    return res.json({
        success: response ? true : false,
        prodCategories: response ? response : 'No categories found'
    })
})
const updateCategory = asyncHandler(async(req, res) => {
    const {pcid} = req.params
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedCategory: response ? response : 'Category not found'
    })
})
const deleteCategory = asyncHandler(async(req, res) => {
    const {pcid} = req.params
    const response = await ProductCategory.findByIdAndDelete(pcid)
    return res.json({
        success: response ? true : false,
        deletedCategory: response ? response : 'Category not found'
    })
})

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}