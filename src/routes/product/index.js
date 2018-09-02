const Router = require('koa-router')
const router = new Router()
const AV = require('../../service/StorageService')

router.post('/save', async (ctx) => {
    const { name, profile, applyForCount, limit, type, url } = ctx.request.body
    const ProductsModel = AV.Object.extend('ProductsModel')
    const item = new ProductsModel()

    item.set('name', name)
    item.set('profile', profile)
    item.set('applyForCount', applyForCount)
    item.set('limit', limit)
    item.set('type', type)
    item.set('url', url)

    try {
        const res = await item.save()

        ctx.body = { code: 0, message: 'success', data: { id: res.id } }
    } catch (error) {
        ctx.body = { code: -1, message: error.rawMessage, error }
    }
})

module.exports = router
