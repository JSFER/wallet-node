const Router = require('koa-router')
const router = new Router()
const AV = require('../../service/StorageService')

router.post('/save', async ctx => {
    const ProductsModel = AV.Object.extend('ProductsModel')
    const item = new ProductsModel()
    const acl = new AV.ACL()

    acl.setPublicReadAccess(true)
    acl.setPublicWriteAccess(true)

    item.setACL(acl)

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

router.get('/query', async ctx => {
    const current = parseInt(ctx.request.query.current)
    const size = parseInt(ctx.request.query.size)
    const query = new AV.Query('ProductsModel')

    try {
        const total = await query.count()

        if (current > 1) {
            query.skip(size * (current - 1))
        }

        const results = await query.limit(size).find()
        const products = results.map(item => {
            return { id: item.id, ...item.attributes }
        })

        ctx.body = { code: 0, message: 'success', data: { products, total, current } }
    } catch (error) {
        ctx.body = { code: -1, message: error.rawMessage, error }
    }
})

router.get('/delete/:id', async (ctx, next) => {
    const { id } = ctx.params
    const item = AV.Object.createWithoutData('ProductsModel', id)

    try {
        await item.destroy()

        ctx.body = { code: 0, message: 'success', data: {} }
    } catch (error) {
        ctx.body = { code: -1, message: error.rawMessage, error }
    }
})

module.exports = router
