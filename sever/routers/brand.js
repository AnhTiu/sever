const router = require('express').Router()
const ctrl = require('../controllers/brand')
const { verifyAccessToken, isAdmin } = require('../midlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], ctrl.createBrand)
router.put('/:brid', [verifyAccessToken, isAdmin], ctrl.updateBrand)
router.delete('/:brid', [verifyAccessToken, isAdmin], ctrl.deleteBrand)
router.get('/', ctrl.getBrand)

module.exports = router