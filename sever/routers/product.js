const router = require('express').Router()
const ctrl = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../midlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], ctrl.createProduct) //create - POST, read - GET, update - PUT, delete - DELETE
router.get('/', ctrl.getProducts) //get all products
router.put('/rating', verifyAccessToken, ctrl.rating)
router.put('/:pid', [verifyAccessToken, isAdmin], ctrl.updateProduct) //create - POST, read - GET, update - PUT, delete - DELETE
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrl.deleteProduct)
router.get('/:pid', ctrl.getProduct)



module.exports = router

// CREATE (POST) + PUT - body 
// GET + DELETE - query // ?sdfs