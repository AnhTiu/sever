const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../midlewares/verifyToken')
const ctrl = require('../controllers/blog')
const uploader = require('../config/cloudinary.config')

router.get('/', ctrl.getBlogs)
router.get('/:bid', ctrl.getBlog)
router.put('/like', [verifyAccessToken], ctrl.likeBlog)
router.put('/dislike', [verifyAccessToken], ctrl.dislikeBlog)
router.post('/', [verifyAccessToken, isAdmin], ctrl.createBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrl.updateBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrl.deleteBlog)
router.put('/uploadimage/:bid', [verifyAccessToken, isAdmin], uploader.single('images'),  ctrl.uploadImageBlog)

module.exports = router