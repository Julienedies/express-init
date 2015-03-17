/**
 * 应用启动文件
 * Created by julien.zhang on 2015/2/26.
 */
var http = require('http');
var https = require('https');
var express = require('express');
var socket = require('socket.io');
var fs = require('fs');
var app = express();


//目录
var path = require("path");
GLOBAL.ROOT_DIR = path.join(__dirname, '../');
GLOBAL.LOG_DIR = path.join(ROOT_DIR, './log/');
GLOBAL.ASSETS_DIR = path.join(ROOT_DIR, '/assets');
GLOBAL.USER_DIR = path.join(ROOT_DIR, './app/');
GLOBAL.CONF_DIR = path.join(USER_DIR, './conf/');
GLOBAL.SERVICE_DIR = path.join(USER_DIR, './services/');
GLOBAL.HELPER_DIR = path.join(USER_DIR, './helper/');
GLOBAL.ACTION_DIR = path.join(USER_DIR, './action/');
GLOBAL.FILTER_DIR = path.join(USER_DIR, './filter/');
GLOBAL.VIEW_DIR = path.join(USER_DIR, './view/');
GLOBAL.STATIC_DIR = path.join(USER_DIR, './static/');
GLOBAL.SITE_DIR = path.join(ROOT_DIR, './site/');


//全局配置
require(CONF_DIR + 'global.js');

//环境相关配置
require(CONF_DIR + app.get('env') + '.js')(app);


app.set('port', PORT);
app.set('trust proxy', 1);

//logger
app.use(require(CONF_DIR + 'logger.js').useLog());

//配置模板引擎
var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', VIEW_DIR);

//express 视图缓存
app.set('view cache', false);
//swig 视图缓存
swig.setDefaults({ cache: false });


//请求体解析
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//cookie
app.use(require('cookie-parser')(COOKIESECRET));


//session
var session = require('express-session');
//var RedisStore = require('connect-redis')(session);
app.use(session({
    //store: new RedisStore(REDIS),
    secret: SEESSIONSECRET,
    saveUninitialized: false,   // don't create session until something stored,
    resave: false,              // don't save session if unmodified
    cookie: { maxAge: 48 * 60 * 60 * 1000 }
}));

//站点图标
app.use('/favicon.ico', express.static(ROOT_DIR + '/favicon.ico'));

//robots文件
app.use('/robots.txt', express.static(ROOT_DIR + '/robots.txt'));

//处理静态视图
app.use('/static', express.static(STATIC_DIR.replace(/\/$/,'')));

//处理静态资源文件,实际产品环境中静态资源由nginx或cdn处理
app.use('/assets', express.static(ASSETS_DIR));

//应用路由
require(HELPER_DIR + 'routes.js')(require(CONF_DIR + 'routes.js'), app);

//start
http.createServer(app).listen(3000, function(){
});
https.createServer({
    key: fs.readFileSync(SITE_DIR + 'server.key', 'utf8'),
    cert:fs.readFileSync(SITE_DIR + 'server.crt', 'utf8')
}, app).listen(3001);

/*
app.listen(app.get('port'), function () {
    LOGGER && LOGGER.getLogger('start').info('m.shukugang.com start on ' + app.get('port') + ' in ' + app.get('env'));
    console.log('m.shukugang.com start on ' + app.get('port') + ' in ' + app.get('env'));
});*/
