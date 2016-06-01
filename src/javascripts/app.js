var app = angular.module('app', ['ngRoute']);


app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
  $routeProvider
    .when('/login', {
      templateUrl: '/assets/partials/login.html'
    })
    .when('/create-username', {
      templateUrl: '/assets/partials/create-username.html'
    })
    .when('/create-name-password', {
      templateUrl: '/assets/partials/create-name-password.html'
    })
    .when('/add-phone', {
      templateUrl: '/assets/partials/add-phone.html'
    })
    .otherwise({redirectTo:'/login'});

  //  $locationProvider.html5Mode(true);
}]);

app.controller('mainController', function(){

})
