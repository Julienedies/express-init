/**
 * 处理静态视图
 * Created by julien.zhang on 2015/2/27.
 */

var fs = require('fs');

module.exports = function (req, res, next) {

    var path = req.path.toLowerCase().replace(/^\//, '');

    if (fs.existsSync(GLOBAL.VIEW_DIR + path + '.html')) {
        return res.render(path);
    }

    // 没有对应静态视图
    next();

};