const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../midlewares/verifyToken')
const ctrl = require('../controllers/blog')

router.get('/', ctrl.getBlogs)
router.put('/like', [verifyAccessToken], ctrl.likeBlog)
router.post('/', [verifyAccessToken, isAdmin], ctrl.createBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrl.updateBlog)

module.exports = router