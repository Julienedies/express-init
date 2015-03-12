/**
 * 开发环境配置
 * Created by julien.zhang on 2015/2/27.
 */


module.exports = function (app) {


    //日志
    app.use(require('morgan')('dev'));

    return {
        view:{
            cache:false
        }
    }


};