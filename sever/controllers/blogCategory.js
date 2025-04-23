const BlogCategory = require('../model/blogCategory')
const asyncHandler = require('express-async-handler')

const createBlogCategory = asyncHandler(async (req, res) => {
    try {
        const response = await BlogCategory.create(req.body);
        res.json({
            success: true,
            createdCategory: response
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Cannot create new blog category',
            error: error.message
        });
    }
});
const getBlogCategories = asyncHandler(async(req, res) => {
    const response = await BlogCategory.find().select('title _id')
    return res.json({
        success: response ? true : false,
        blogCategories: response ? response : 'No blog categories found'
    })
})
const updateBlogCategory = asyncHandler(async(req, res) => {
    const {bcid} = req.params
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedCategory: response ? response : 'Blog category not found'
    })
})
const deleteBlogCategory = asyncHandler(async(req, res) => {
    const {bcid} = req.params
    const response = await BlogCategory.findByIdAndDelete(bcid)
    return res.json({
        success: response ? true : false,
        deletedCategory: response ? response : 'Blog category not found'
    })
})

module.exports = {
    createBlogCategory,
    getBlogCategories,
    updateBlogCategory,
    deleteBlogCategory
}