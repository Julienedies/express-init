/**
 * 开发环境配置
 * Created by julien.zhang on 2015/2/27.
 */

GLOBAL.ENVIRONMENT = 'development';

GLOBAL.MYSQL = {
    host: '192.168.0.229',
    port: 3306,
    user: 'ada_user',
    password: 'ada_user',
    resource: 'ada_cam'
};

GLOBAL.PORTALMOBILE = "http://192.168.250.204:18080/portalmobile";



module.exports = function (app) {

    //debug
    app.use(function(req, res, next){
        var path = req.path.replace(/^\//, '');
        console.log(GLOBAL.VIEW_DIR + path + '.html', '#', path);
        next();
    });

    //日志
    app.use(require('morgan')('dev'));
    //日志
    app.use(require('express-logger')({
        path: LOG_DIR + 'requests.log'
    }));

    return {
        view:{
            cache:false
        }
    }


};