const Router = require('koa-router')
const router = new Router()
const productRouter = require('./product')

if (ctx.app.env === 'dev') {
    router.all('*', async (ctx, next) => {
        ctx.response.set('Access-Control-Allow-Origin', '*')
        ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

        await next()
    })
}

router.use('/api/files', productRouter.routes())

module.exports = router
