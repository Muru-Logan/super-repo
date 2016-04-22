var _ = require('lodash')
var ws = require('ws')

var clients = []

exports.connect = function(server)
{
    var wss = new ws.Server({server:server})
    wss.on('connection', function(ws)
    {
        console.log("connected - web sockets")
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
    var json = JSON.stringify({topic: topic, data: data})
    console.log("publishing" + json)
    clients.forEach(function(client){
        //console.log(client)
        client.send(json)
    })
}






