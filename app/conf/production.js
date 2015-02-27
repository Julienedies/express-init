/**
 * 产品环境配置
 * Created by julien.zhang on 2015/2/27.
 */

GLOBAL.ENVIRONMENT = 'production';

GLOBAL.MYSQL = {
    host: '122.144.134.3',
    port: 3306,
    user: 'website',
    password: 'N1oEySUOvz',
    resource: 'ada_cam'
};

GLOBAL.PORTALMOBILE = "http://m.chinascopefinancial.com.cn/portalmobile";




module.exports = function (app) {

    //产品环境禁用头信息
    app.disable('x-powered-by');

    //日志
    app.use(require('express-logger')({
        path: LOG_DIR + 'requests.log'
    }));


    return {
        view:{
            cache:true
        }

    };


};