const router = require('express').Router()
const ctrl = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../midlewares/verifyToken')

router.post('/register', ctrl.register) //create - POST, read - GET, update - PUT, delete - DELETE
router.post('/login', ctrl.login)
router.get('/current',verifyAccessToken, ctrl.getCurrent)
router.post('/refreshToken', ctrl.refreshAccessToken) 
router.get('/logout', ctrl.logout)   
router.get('/forgotpassword', ctrl.forgotPassword)  
router.put('/resetpassword', ctrl.resetPassword) 
router.get('/', [verifyAccessToken, isAdmin], ctrl.getUsers)   
router.delete('/', [verifyAccessToken, isAdmin], ctrl.deleteUser)   

module.exports = router

// CREATE (POST) + PUT - body 
// GET + DELETE - query // ?sdfs