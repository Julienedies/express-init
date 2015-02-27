/**
 * Created by julien.zhang on 2015/2/27.
 */


module.exports = function (req, res) {
    res.status(404);
    res.render('error/404.html');
};