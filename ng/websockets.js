angular.module('app')
    .run(function($rootScope){
        var url = "ws://localhost:2001"
        
        var connection = new WebSocket(url)
        
        connection.onopen = function () {
          console.log("web socket connected")
        }
        
        connection.onmessage = function(e){
            console.log(e)
            var payload = JSON.parse(e)
            
            $rootScope.$broadcast('ws:' + payload.topic, payload.data)
        }
        
    })
