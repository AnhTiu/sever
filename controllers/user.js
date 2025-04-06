const User = require('../model/user')
const asyncHandler = require('express-async-handler')
const {generateAccessToken, generateRefreshToken} = require('../midlewares/jwt')
const { response } = require('express')


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
        const accessToken = generateAccessToken(response.id, role)
        // Tao refreshToken
        const refreshToken = generateRefreshToken(response.id)
        // Luu refreshToken vao database
        await User.findByIdAndUpdate(response.id, { refreshToken}, {new: true})
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
    const {id} = req.user
    const user = await User.findById(id).select('-refreshToken -password -role') 
    return res.status(200).json({
        success: false,
        rs: user ? user : 'User not found'
    })
})

module.exports = {
    register,
    login,
    getCurrent
}