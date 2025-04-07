const router = require('express').Router()
const ctrl = require('../controllers/user')
const { verifyAccessToken } = require('../midlewares/verifyToken')

router.post('/register', ctrl.register) //create - POST, read - GET, update - PUT, delete - DELETE
router.post('/login', ctrl.login)
router.get('/current',verifyAccessToken, ctrl.getCurrent)
router.post('/refreshToken', ctrl.refreshAccessToken) 
router.get('/logout', ctrl.logout)   

module.exports = router