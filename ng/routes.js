angular.module('app')
    .config(['$routeProvider', function($routeProvider)
    {
        $routeProvider
        .when('/posts',  {controller: 'PostsCtrl', templateUrl: '/templates/posts.html'})
        .when('/register',  {controller: 'RegisterCtrl', templateUrl: '/templates/register.html'})
        .when('/',  {controller: 'LoginCtrl', templateUrl: '/templates/login.html'})   
    }])
