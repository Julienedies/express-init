/**
 * 根据配置应用路由
 * Created by julien.zhang on 2015/2/27.
 */

module.exports = function(conf, app){

    var filters = conf.filter;

    var before = filters.before;

    var after = filters.after;

    function applyFilter(filter){
        var _filter = getAction(filter, FILTER_DIR);
        if(_filter){
            app.use(_filter);
        }else{
            throw 'miss filter for ' + filter;
        }
    }

    before.forEach(applyFilter);

    var routes = conf.mapping;

    routes.forEach(function(route){

        var action = getAction(route.action, ACTION_DIR);
        if(!action){
            throw 'miss action for ' + route.url;
        }
        if(action.constructor !== Function){
            throw 'action must be a function for' + route.url;
        }

        var params = [action];

        var filter = route.filter || {};
        var before = [];
        var after = [];

        if(filter.constructor === Array){
            before = filter;
            after = [];
        }else if(filter.constructor === Object){
            before = filter.before || [];
            after = filter.after || [];
            before = before.constructor === Array ? before : [before];
            after = after.constructor === Array ? after : [after];
        }

        before.forEach(function(filter){
            var _filter = getAction(filter, FILTER_DIR);
            if(_filter){
                params.unshift(_filter);
            }else{
                throw 'miss filter for ' + filter;
            }
        });

        after.forEach(function(filter){
            var _filter = getAction(filter, FILTER_DIR);
            if(_filter){
                params.push(_filter);
            }else{
                throw 'miss filter for ' + filter;
            }
        });

        params.unshift(route.url);

        //app[route.method || 'all'](route.url, action);
        app[route.method || 'all'].apply(app, params);

    });

    after.forEach(applyFilter);


};



function getAction(namespace, dir){
    namespace = namespace.split('.');
    try{
        var ctrl = require(dir + namespace.shift());
        return namespace.length ? ctrl[namespace.shift()] : ctrl;
    }catch(e){
        console.log(e);
        return false;
    }
}