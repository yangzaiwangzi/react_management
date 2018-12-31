const proxy = require('http-proxy-middleware');
//注册代理
module.exports = function(app) { 

    const options = {
        target: 'https://portal-test.zmlearn.com', 
        changeOrigin: true, 
        ws: false, 
        pathRewrite: {
            '/api/auth': '/api/auth', 
            '/api': '/api', 
            '/api/meeting-mp': '/api/meeting-mp', 
        }, 
    };
    const exampleProxy = proxy(options);
    app.use('/api', exampleProxy);

};