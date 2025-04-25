const Brand = require('../model/brand')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async (req, res) => {
    try {
        const response = await Brand.create(req.body);
        res.json({
            success: true,
            createdBrand: response
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Cannot create new brand',
            error: error.message
        });
    }
});
const getBrand = asyncHandler(async(req, res) => {
    const response = await Brand.find()
    return res.json({
        success: response ? true : false,
        brands: response ? response : 'No brands found'
    })
})
const updateBrand = asyncHandler(async(req, res) => {
    const {brid} = req.params
    const response = await Brand.findByIdAndUpdate(brid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedBrand: response ? response : 'Brand not found'
    })
})
const deleteBrand = asyncHandler(async(req, res) => {
    const {brid} = req.params
    const response = await Brand.findByIdAndDelete(brid)
    return res.json({
        success: response ? true : false,
        deletedBrand: response ? response : 'Brand not found'
    })
})

module.exports = {
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
}