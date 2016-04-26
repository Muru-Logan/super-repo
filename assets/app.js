angular.module('app',  ['ngRoute'])

angular.module('app')
        .controller('ApplicationCtrl', function($scope)
        {
            $scope.on('login', function(_, user){
                $scope.currentUser = user
            })
        })
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
                            $rootScope.token = token.token
                            
                            $location.path('/posts')
                        } 
                       /* if ($scope.token.err != ""){
                            $scope.err = token.err
                        } */                                           
                })
          
       }
             
   })
   
   
angular.module('app')
.controller('PostsCtrl', function ($scope, $http, $rootScope, PostsSvc) {
        
    $scope.addPost = function () {
           
             if ($scope.postBody) {
            
                  var post = { 
                          username: $rootScope.loggedusername,
                          body: $scope.postBody
                      }
                 PostsSvc.create(post)
                  /*   { 
                          username: "Muru",
                          body: $scope.postBody
                      })    */
                    .success(function (post){
                         //  $scope.posts.unshift(post)
                           $scope.postBody = null
                    })
        }
    }
        
    $scope.$on('ws:new_post', function (_, post) {
                        $scope.$apply(function () {
                        $scope.posts.unshift(post)
                    })
     })
        
        
    PostsSvc.fetch()
           .success(function(posts)
                       {
                           $scope.posts = posts
                       })    
    
})

angular.module('app')
.service('PostsSvc', function($http)
 {
               this.fetch = function()
               {
                   return $http.get('/api/posts')
               } 
                           
               this.create = function(post)
               {
                   return $http.post('/api/posts', post)
               }
               
               
 })


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
angular.module('app')
    .config(['$routeProvider', function($routeProvider)
    {
        $routeProvider
        .when('/posts',  {controller: 'PostsCtrl', templateUrl: '/templates/posts.html'})
        .when('/register',  {controller: 'RegisterCtrl', templateUrl: '/templates/register.html'})
        .when('/',  {controller: 'LoginCtrl', templateUrl: '/templates/login.html'})   
        .when('/login',  {controller: 'LoginCtrl', templateUrl: '/templates/login.html'})
    }])

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

angular.module('app')
   .service('UserSvc', function($http){
           
       var svc = this;
       
       svc.register = function(user){
           
           return $http.post('/api/users',user)
       }
       
   })

angular.module('app')
    .run(function($rootScope){
        var protocol = location.protocol
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
            if (protocol == "http:")
            {
               $rootScope.$broadcast('ws:' + payload.topic, payload.data) 
            }
            
            if (protocol == "https:")
            {
               $rootScope.$broadcast('wss:' + payload.topic, payload.data) 
            }
            
        }
        
    })