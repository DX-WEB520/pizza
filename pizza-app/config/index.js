const path = require('path')

module.exports = {
    dev:{
        assetsSubDirectory : 'static',
        assetsPublicPath : '/',
        proxyTable:{
            '/api':{
                target:'http://localhost:8088',
                changeOrigin:true,
                pathRewrite:{
                    '^/api' : ''
                }
            }
        },
    }
}