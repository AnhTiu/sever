const Coupon = require('../model/coupon')
const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler(async(req, res) => {
    const {name, discount, expire} = req.body
    if(!name || !discount || !expire)throw new Error('Missing input')
    const response = await Coupon.create({
        ...req.body,
        expire: Date.now() + +expire * 24 * 60 * 60 * 1000
    })
    return res.json({
        success: response ? true : false,
        createdCoupon: response ? response : 'Cannot create coupon'
    })
})
const getCoupons = asyncHandler(async(req, res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt')
    return res.json({
        success: response ? true : false,
        Coupons: response ? response : 'Cannot get coupons'
    }) 
})
const updateCoupon = asyncHandler(async(req, res) => {
    const {cid} = req.params
    if(Object.keys(req.body).length === 0)throw new Error('Missing input')
    if(req.body.expire)req.body.expire = Date.now() + +req.body.expire *24 * 60 * 60 * 1000
    const response = await Coupon.findByIdAndUpdate(cid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedCoupon: response ? response : 'Cannot update coupon'
    }) 
})
const deleteCoupon = asyncHandler(async(req, res) => {
    const {cid} = req.params
    const response = await Coupon.findByIdAndDelete(cid)
    return res.json({
        success: response ? true : false,
        deletedCoupon: response ? response : 'Cannot delete coupon'
    }) 
})
module.exports = {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon
}