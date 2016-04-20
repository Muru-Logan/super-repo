var _ = require('lodash')
var ws = require('ws')

var clients = []

exports.connect = function(server)
{
    var wss = new ws.Server({server:server})
    wss.on('connection', function(ws)
    {
        clients.push(ws)
        //exports.broadcast("posts", "new data")
       // ws.send('hello web sockets')   
    //})
       console.log("connected")
        ws.on('close', function(ws){
            _.remove(clients, ws)
        })
    })
}

exports.broadcast = function(topic, data){
    var json = JSON.stringify({topic: topic, data:data})
    
    clients.forEach(function(client){
        client.send(json)
    })
}






