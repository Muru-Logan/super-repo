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
        
    var protocol = $rootScope.protocol
    if (protocol == "http:")   {
        ws = 'ws:new_post'
    }   
    
    if (protocol == "https:")   {
        ws = 'wss:new_post'
    }
    $scope.$on(ws, function (_, post) {
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
