const { response } = require('express')
const Product = require('../model/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler (async(req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Failed to create product',
    })
})

const getProduct = asyncHandler (async(req, res) => {
    const {pid} = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Failed to get product',
    })
})
// filtering, sorting, pagination
const getProducts = asyncHandler (async(req, res) => {
    const queries = {...req.query}
    // Tach cac truong dac biet ra khoi query
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    // Format lai cac operators cho dung cu phap cua mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)

    // filtering
    if(queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
    let queryCommand = Product.find(formatedQueries)

    // sorting
    // abc,efg => [abc,efg] => abc efg
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    // field limiting 
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    // pagination
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);
    // Excute query
    // So luong san pham thoa man dieu kien !== so luong san pham tra ve 1 lan goi api
    try {
        const response = await queryCommand.exec();
        const counts = await Product.find(formatedQueries).countDocuments();
        return res.status(200).json({
            success: response ? true : false,
            products: response ? response : 'Failed to get products',
            counts
        });
    } catch (err) {
        throw new Error(err.message);
    }
});


const updateProduct = asyncHandler (async(req, res) => {
    const {pid} = req.params
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true})
    return res.status(200).json({
        success: updateProduct ? true : false,
        updateProduct: updateProduct ? updateProduct : 'Failed to update product',
    })
})

const deleteProduct = asyncHandler (async(req, res) => {
    const {pid} = req.params
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Failed to delete product',
    })
})
const rating = asyncHandler(async (req, res) => {
    const { _id} = req.user;
    const {star, comment, pid} = req.body;
    if(!star || !pid)throw new Error('Some things are missing')
    const ratingProduct = await Product.findById(pid);
    const ratingExists = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id);
    //console.log({ratingExists});
    if(ratingExists){
        await Product.updateOne({
            ratings: {$elemMatch: ratingExists}
        }, {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment }
        }, {new: true})
    }else{
        const response = await Product.findByIdAndUpdate(pid, {$push: {ratings: {star, comment, postedBy: _id}}}, {new: true});
    }
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updatedProduct.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10

    await updatedProduct.save()


    return res.status(200).json({
        status: true,
        updatedProduct
    })
})
const uploadImageProduct = asyncHandler(async(req, res) => {
    console.log(req.file);
    return res.json('OK')
})
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    rating,
    uploadImageProduct
}