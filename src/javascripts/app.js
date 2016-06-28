// Define App
var app = angular.module('app', ['ngRoute','ngStorage','satellizer']);

app.value('API','https://portaldev.nightwatch24.com:44433/');

app.config(['$routeProvider','$locationProvider','$authProvider','$httpProvider',
function($routeProvider,$locationProvider,$authProvider){

  $authProvider.loginUrl = 'https://portaldev.nightwatch24.com:44433/api/login';
  $authProvider.tokenName = 'access_token';
  $routeProvider
    .when('/', {
      templateUrl: 'assets/partials/dashboard.html',
      controller: 'dashboardController',
      activetab: 'dashboard'
    })
    .when('/login', {
      templateUrl: 'assets/partials/login.html',
      controller: 'loginController as login'
    })
    .when('/register', {
      templateUrl: 'assets/partials/register.html',
      controller: 'registerController'
    })
    .when('/create-name-password', {
      templateUrl: 'assets/partials/create-name-password.html'
    })
    .when('/add-phone', {
      templateUrl: 'assets/partials/add-phone.html',
      controller: 'phoneController as phone'
    })
    .when('/primary-address', {
      templateUrl: 'assets/partials/primary-address.html'
    })
    .when('/billing-address', {
      templateUrl: 'assets/partials/billing-address.html'
    })
    .when('/create-subaccount', {
      templateUrl: 'assets/partials/create-subaccount.html'
    })
    .when('/create-group', {
      templateUrl: 'assets/partials/create-group.html'
    })
    .when('/add-device', {
      templateUrl: 'assets/partials/add-device.html',
      controller: 'deviceController as device'
    })
    .when('/add-horse', {
      templateUrl: 'assets/partials/add-horse.html',
      controller: 'horseController'
    })
    .when('/notification-settings', {
      templateUrl: 'assets/partials/notification-settings.html'
    })
    // Admin Views
    .when('/user', {
      templateUrl: 'assets/partials/user.html',
      controller: 'userController as user'
    })
    .when('/devices', {
      templateUrl: 'assets/partials/devices.html',
      controller: 'deviceController as device',
      activetab: 'devices'
    })
    .when('/horses', {
      templateUrl: 'assets/partials/horses.html',
      controller: 'horseController as horse',
      activetab: 'horses'
    })
    .when('/horses/:id', {
      templateUrl: 'assets/partials/horse.html',
      controller: 'horseController as horse',
      activetab: 'horses'
    })
    .otherwise({redirectTo:'/login'});

    //$locationProvider.html5Mode(true);
}]);

  app.run(['$http',function($http){
        $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $http.defaults.headers.common['Accept'] = 'application/json;odata=verbose';
    }])
