const User = require('../model/user')
const asyncHandler = require('express-async-handler')


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
        const {password, role, ...userData} = response.toObject()
        return res.status(200).json({
            success: true,
            userData
        })
    }else {
        throw new Error('Invalid email or password')
    }


})

module.exports = {
    register,
    login
}