const proxy = require('http-proxy-middleware');
//注册代理
module.exports = function(app) {
    app.use(proxy('/v1',{ //实例
            target: 'http://localhost:1234/' 
        })
    );
};