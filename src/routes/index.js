const Router = require('koa-router')
const router = new Router()
const productRouter = require('./product')
const userRouter = require('./user')

router.all('*', async (ctx, next) => {
    if (ctx.app.env === 'dev') {
        ctx.response.set('Access-Control-Allow-Origin', '*')
        ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    }

    await next()
})

router.use('/api/product', productRouter.routes())
router.use('/api/user', userRouter.routes())

module.exports = router
