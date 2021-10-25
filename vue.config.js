module.exports = {
    devServer:{
        port:8081,
        proxy:{
            '/api':{
                target:"http://kumanxuan1.f3322.net:8081",
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    }
}
