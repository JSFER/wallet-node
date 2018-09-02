const Router = require('koa-router')
const router = new Router()

router.post('/login', (ctx) => {
    const {username, password} = ctx.request.body

    if(username === 'admin' && password === 'admin'){
        ctx.body = { code: 0, message: 'success', data: {} }
    }else{
        ctx.body = { code: -1, message: '用户名密码错误，请重新输入！', data: {} }
    }
})

module.exports = router