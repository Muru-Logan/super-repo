angular.module('app')
   .controller('LoginCtrl', function($scope, $location, $rootScope, TokenSvc){
       
       $scope.login = function(username, password)
       {
           var user = { username: username, password: password}
           TokenSvc.generate(user)
                .success(function(token){
                        $scope.token = token
                        if ($scope.token.token != ""){
                            $rootScope.loggedusername = user.username
                            $location.path('/posts')
                        } 
                       /* if ($scope.token.err != ""){
                            $scope.err = token.err
                        } */                                           
                })
          
       }
             
   })
   
   