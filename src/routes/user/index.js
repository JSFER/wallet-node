const Router = require('koa-router')
const router = new Router()

router.post('/login', (ctx) => {
    ctx.body = { code: 0, message: 'success', data: {} }
})

module.exports = router