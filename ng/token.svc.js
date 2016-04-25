angular.module('app')
    .service('TokenSvc', function($http){
        
        var svc = this
        
        // validate the given token
        svc.validate = function(token)
        {
                  // returns the user    
            return $http.post('api/token/validate', {
                                            headers: {'authorization': token}
                                            
                                            })
        }
        
        // generate the token for given user
        svc.generate = function(user)
        {
            return $http.post('/api/token/generate', user)    
        }
        
    })
