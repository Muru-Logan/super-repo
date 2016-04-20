angular.module('app',  ['ngRoute'])

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
angular.module('app')
.controller('PostsCtrl', function ($scope, $http, PostsSvc) {
        
    $scope.addPost = function () {
           
             if ($scope.postBody) {
            
                  var post = { 
                          username: "Muru",
                          body: $scope.postBody
                      }
                 PostsSvc.create(post)
                  /*   { 
                          username: "Muru",
                          body: $scope.postBody
                      })    */
                    .success(function (post){
                          // $scope.posts.unshift(post)
                          // $scope.postBody = null
                    })
        }
    }
        
   /* $scope.$on('ws:new_post', function (_, post) {
                        $scope.$apply(function () {
                        $scope.posts.unshift(post)
                    })
     })*/
        
        
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
    .config(['$routeProvider', function($routeProvider)
    {
        $routeProvider
        .when('/posts',  {controller: 'PostsCtrl', templateUrl: '/templates/posts.html'})
        .when('/register',  {controller: 'RegisterCtrl', templateUrl: '/templates/register.html'})
        .when('/',  {controller: 'LoginCtrl', templateUrl: '/templates/login.html'})   
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
           
       
       
   })

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
