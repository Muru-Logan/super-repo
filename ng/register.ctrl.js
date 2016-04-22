angular.module('app')
    .controller('RegisterCtrl', function ($scope, $location, UserSvc) {
        
        $scope.register = function (username, password) {
            var user = {username: username, password:password}
            
            UserSvc.register(user).success(function()
            {
                $location.path('/')
            })
           
        } 
        
    })