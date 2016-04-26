angular.module('app')
    .run(function($rootScope){
        var protocol = location.protocol
        $rootScope.protocol = protocol
        var url = ""
        if (protocol == "http:"){
                url = location.origin.replace(/^http/, 'ws')
        }
        
        if (protocol == "https:"){
                url = location.origin.replace(/^https/, 'wss')
        }
        //var url = "ws://localhost:2273"
        
                     
        var connection = new WebSocket(url)
        
        connection.onopen = function () {    
            $rootScope.connectionStatus = "opened"
        }
        
        connection.onmessage = function(e){
            $rootScope.connectionStatus = e
            var payload = JSON.parse(e.data)
            
            $rootScope.connectionStatus = payload.data
            var ws = 'ws:'
            if (protocol == "http:")
            {
               ws = 'ws:' 
            }
            
            if (protocol == "https:")
            {
               ws = 'wss:' 
            }
            $rootScope.$broadcast(ws + payload.topic, payload.data)
        }
        
    })