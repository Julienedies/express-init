/**
 * Created by julien.zhang on 2015/2/27.
 */


module.exports = function (err, req, res) {
    console.error(err.stack);
    res.status(500);
    res.render('error/500.html');
};