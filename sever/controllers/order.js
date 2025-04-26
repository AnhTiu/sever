const Order = require('../model/order')
const User = require('../model/user')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async(req, res) => {
    const {_id} = req.user 
    const userCart = await User.findById(_id).select('cart')

    return res.json({
        success: userCart ? true : false,
        createdOrder: userCart ? userCart : 'Cannot create Order'
    })
})

module.exports = {
    createOrder
}