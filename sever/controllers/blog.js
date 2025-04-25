const Blog = require('../model/blog')
const asyncHandler = require('express-async-handler')

const createBlog = asyncHandler(async (req, res) => {
    const {title, description, category} = req.body
    if(!title || !description || !category)throw new Error('Missing input')
    try {
        const response = await Blog.create(req.body);
        res.json({
            success: true,
            createdBlog: response
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Cannot create new blog',
            error: error.message
        });
    }
});
const updateBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    if(Object.keys(req.body).lenght === 0)throw new Error('Missing input')
    const response = await Blog.findByIdAndUpdate(bid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedBlog: response ? response : 'Cannot update blog'
    })
})
const getBlogs = asyncHandler(async(req, res) => {
    const response = await Blog.find()
    return res.json({
        success: response ? true : false,
        blogs: response ? response : 'Cannot get blogs'
    })
})
const likeBlog = asyncHandler(async(req, res) => {
    const {_id} = req.user
    const {bid} = req.body
    if(!bid) throw new Error('Missing input')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if(alreadyDisliked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if(isLiked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }else {
        const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})
const dislikeBlog = asyncHandler(async(req, res) => {
    const {_id} = req.user
    const {bid} = req.body
    if(!bid) throw new Error('Missing input')
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if(alreadyLiked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if(isDisliked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }else {
        const response = await Blog.findByIdAndUpdate(bid, {$push: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})
const excludedField = 'firstname lastname'
const getBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndUpdate(bid, {$inc: {numberViews: 1}}, {new: true})
        .populate('likes', excludedField)
        .populate('dislikes', excludedField)
    return res.json({
        success: blog ? true : false,
        rs: blog
    })
})
const deleteBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndDelete(bid)
    return res.json({
        success: blog ? true : false,
        deletedBlog: blog || 'Something went wrong'
    })
})
module.exports = {
    createBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog
}