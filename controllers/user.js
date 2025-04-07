const User = require('../model/user')
const asyncHandler = require('express-async-handler')
const {generateAccessToken, generateRefreshToken} = require('../midlewares/jwt')
const { response } = require('express')
const jwt = require('jsonwebtoken')

const register = asyncHandler(async (req, res) => {
    const {email, password, firstname, lastname} = req.body
    if(!email || !password || !firstname || !lastname) 
    return res.status(400).json({
        success: false,
        mes: 'Missing input'
    })

    const user = await User.findOne({email})
    if(user)
        throw new Error('User has already been registered')
    else{
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success : newUser ? true : false,
            mes : newUser ? 'User created successfully!! Please login' : 'Something went wrong'
        })
    }
})
// refreshToken => Cap moi accessToken
// accessToken => Xac thuc nguoi dung, phan quyen nguoi dung
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) 
    return res.status(400).json({
        success: false,
        mes: 'Missing input'
    })
    //plain object
    const response = await User.findOne({email})
    if(response && await response.isCorrectPassword(password)) {
        // Tach password va role ra khoi response
        const {password, role, ...userData} = response.toObject()
        // Tao accessToken
        const accessToken = generateAccessToken(response._id, role)
        // Tao refreshToken
        const refreshToken = generateRefreshToken(response._id)
        // Luu refreshToken vao database
        await User.findByIdAndUpdate(response._id, { refreshToken}, {new: true})
        // Luu refreshToken vao cookie
        res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    }else {
        throw new Error('Invalid email or password')
    }


})

const getCurrent = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role') 
    return res.status(200).json({
        success: false,
        rs: user ? user : 'User not found'
    })
})
const refreshAccessToken = asyncHandler(async(req, res) => {
    // Lay token tu cookie
    const cookie = req.cookies
    // Check xem cos Token hay khong
    if(!cookie && !cookie.refreshToken) throw new Error('Missing refresh token')
    // Check token co hop le hay khong
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({_id: rs._id}, {refreshToken: cookie.refreshToken})
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Invalid refresh token'
        })

})
   
const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    if(!cookie || !cookie.refreshToken) throw new Error('Missing refresh token in cookies')
    // Xoa refreshToken o database
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true})
    // Xoa refreshToken o cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logged out successfully'
    })
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout
}