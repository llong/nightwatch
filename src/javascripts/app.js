// Define App
var app = angular.module('app', ['ngRoute','ngStorage']);


app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
  $routeProvider
    .when('/login', {
      templateUrl: '/assets/partials/login.html',
      controller: 'loginController'
    })
    .when('/register', {
      templateUrl: '/assets/partials/register.html',
      controller: 'registerController'
    })
    .when('/create-name-password', {
      templateUrl: '/assets/partials/create-name-password.html'
    })
    .when('/add-phone', {
      templateUrl: '/assets/partials/add-phone.html'
    })
    .when('/primary-address', {
      templateUrl: '/assets/partials/primary-address.html'
    })
    .when('/billing-address', {
      templateUrl: '/assets/partials/billing-address.html'
    })
    .when('/create-subaccount', {
      templateUrl: '/assets/partials/create-subaccount.html'
    })
    .when('/create-group', {
      templateUrl: '/assets/partials/create-group.html'
    })
    .when('/add-device', {
      templateUrl: '/assets/partials/add-device.html',
      controller: 'deviceController'
    })
    .when('/add-horse', {
      templateUrl: '/assets/partials/add-horse.html',
      controller: 'horseController'
    })
    .when('/notification-settings', {
      templateUrl: '/assets/partials/notification-settings.html'
    })
    .otherwise({redirectTo:'/login'});

    //$locationProvider.html5Mode(true);
}]);

app.run(['$http','$localStorage', function($http,$localStorage){
  $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token.access_token;
  $http.defaults.headers.common.Accept = 'application/json;odata=verbose';
}])
