angular.module('app')
   .controller('LoginCtrl', function($scope, $location, TokenSvc){
       
       $scope.login = function(username, password)
       {
           var user = { username: username, password: password}
           TokenSvc.generate(user).success(function(token)
                                    {
                                        $scope.token = token
                                        
                                         if ($scope.token.token != "")
                                            {
                                                $location.path('/posts')
                                            }   
                                        
                                    })
          
       }
             
   })