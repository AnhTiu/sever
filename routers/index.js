const userRouter = require('./user')
const {notFound, errHandler} = require('../midlewares/errHandle')

const initRouter = (app) => {
    app.use('/api/user', userRouter)



    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRouter