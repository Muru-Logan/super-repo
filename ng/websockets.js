angular.module('app')
    .run(function($rootScope){
        var url = location.origin.replace(/^https/, 'ws')
        //var url = "ws://localhost:2273"
                       
        var connection = new WebSocket(url)
        
        connection.onopen = function () {    
            $rootScope.connectionStatus = "opened"
        }
        
        connection.onmessage = function(e){
            $rootScope.connectionStatus = e
            var payload = JSON.parse(e.data)
            
            $rootScope.connectionStatus = payload.data
            $rootScope.$broadcast('ws:' + payload.topic, payload.data)
        }
        
    })