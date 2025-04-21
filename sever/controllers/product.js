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

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}