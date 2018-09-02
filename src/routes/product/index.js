const Router = require('koa-router')
const router = new Router()
const AV = require('../../service/StorageService')

router.post('/save', async ctx => {
    const ProductsModel = AV.Object.extend('ProductsModel')
    const item = new ProductsModel()

    Object.keys(ctx.request.body).forEach(key => {
        item.set(key, ctx.request.body[key])
    })

    try {
        const res = await item.save()

        ctx.body = { code: 0, message: 'success', data: { id: res.id } }
    } catch (error) {
        ctx.body = { code: -1, message: error.rawMessage, error }
    }
})

module.exports = router
