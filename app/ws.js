/**
 * Created by julien.zhang on 2015/3/16.
 */

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port:3100});

wss.on('connection', function(ws){
    ws.on('message', function(msg){
        console.log(msg);
        wss.broadcast(msg);
    });
});

wss.broadcast = function(data){
    wss.clients.forEach(function(client){
        client.send(data);
    })
}