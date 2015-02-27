/**
 * 应用启动文件
 * Created by julien.zhang on 2015/2/26.
 */

var path = require("path");
var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');
var app = express();

GLOBAL.ROOT_DIR = path.join(__dirname, '../');
GLOBAL.LOG_DIR = path.join(ROOT_DIR , "./log/");
GLOBAL.ASSETS_DIR = path.join(ROOT_DIR , "./assets/");
GLOBAL.USER_DIR = path.join(ROOT_DIR , "./app/");
GLOBAL.CONF_DIR = path.join(USER_DIR , "./conf/");
GLOBAL.ACTION_DIR = path.join(USER_DIR , "./action/");
GLOBAL.FILTER_DIR = path.join(USER_DIR , "./filter/");
GLOBAL.VIEW_DIR = path.join(USER_DIR , "./view/");



app.set('port', 8080);

//环境配置
var conf = require(CONF_DIR + app.get('env') + '.js')(app);

//配置模板引擎
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', VIEW_DIR);

//express 视图缓存
app.set('view cache', conf.view.cache);
//swig 视图缓存
swig.setDefaults({ cache: conf.view.cache });

//处理静态资源文件,实际产品环境中静态资源会由nginx或cdn处理
app.use(express.static(ASSETS_DIR));

//请求体解析
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.json({limit: '5mb'}));

//cookie
app.use( require('cookie-parser')('12xdh6ig') );
//session
app.use( require('express-session')() );

//应用路由
require('./helper/routes.js')(require(CONF_DIR + 'routes.js'), app);

//start
app.listen(app.get('port'), function(){
    console.log('m.shukugang.com start on ' + app.get('port') + ' in ' + app.get('env'));
});