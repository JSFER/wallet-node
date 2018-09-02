const AV = require('leancloud-storage')
const APP_ID = 'wbkT05ncoOLlYGrm55GvYtDt-gzGzoHsz'
const APP_KEY = 'QWOEEgLG978G6e5TG6ORqftJ'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

module.exports = AV