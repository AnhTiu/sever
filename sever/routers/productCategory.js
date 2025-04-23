const router = require('express').Router()
const ctrl = require('../controllers/blogCategory')
const { verifyAccessToken, isAdmin } = require('../midlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], ctrl.createBlogCategory)
router.put('/:pcid', [verifyAccessToken, isAdmin], ctrl.updateBlogCategory)
router.delete('/:pcid', [verifyAccessToken, isAdmin], ctrl.deleteBlogCategory)
router.get('/', ctrl.getBlogCategories)

module.exports = router