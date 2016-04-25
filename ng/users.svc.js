angular.module('app')
   .service('UserSvc', function($http){
           
       var svc = this;
       
       svc.register = function(user){
           
           return $http.post('/api/users',user)
       }
       
   })
