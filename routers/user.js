const router = require('express').Router()
const ctrl = require('../controllers/user')

router.post('/register', ctrl.register) //create - POST, read - GET, update - PUT, delete - DELETE

module.exports = router