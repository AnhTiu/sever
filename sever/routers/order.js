const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../midlewares/verifyToken')
const ctrl = require('../controllers/order')

router.post('/', [verifyAccessToken], ctrl.createOrder)
router.get('/', [verifyAccessToken], ctrl.getUserOrder)
router.put('/status/:oid', [verifyAccessToken, isAdmin], ctrl.updateStatus)
router.get('/admin', [verifyAccessToken, isAdmin], ctrl.getOrders)

module.exports = router