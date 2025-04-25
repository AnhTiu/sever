const router = require('express').Router()
const ctrl = require('../controllers/coupon')
const { verifyAccessToken, isAdmin } = require('../midlewares/verifyToken')



router.get('/', ctrl.getCoupons)
router.post('/', [verifyAccessToken, isAdmin], ctrl.createCoupon)
router.put('/:cid', [verifyAccessToken, isAdmin], ctrl.updateCoupon)
router.delete('/:cid', [verifyAccessToken, isAdmin], ctrl.deleteCoupon)



module.exports = router