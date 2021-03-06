// Define App
var app = angular.module('app',
['ngRoute','ngStorage','satellizer','ngAnimate','vesparny.fancyModal','chart.js'
]);

if( typeof apiRoot === 'undefined' )
{
  apiRoot = 'http://localhost/';
}

app.value('API',apiRoot);

app.config(['$routeProvider','$locationProvider','$authProvider','$httpProvider',
function($routeProvider,$locationProvider,$authProvider){

  $authProvider.loginUrl = apiRoot + '/api/login';
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
    .when('/register/:verifyAccount', {
      templateUrl: 'assets/partials/verifyAccount.html',
      controller: 'verifyController'
    })
    .when('/create-name-password', {
      templateUrl: 'assets/partials/create-name-password.html'
    })
    .when('/add-phone', {
      templateUrl: 'assets/partials/add-phone.html',
      controller: 'phoneController as phone'
    })
    .when('/primary-address', {
      templateUrl: 'assets/partials/primary-address.html',
      controller: 'addressController as address'
    })
    .when('/billing-address', {
      templateUrl: 'assets/partials/billing-address.html',
      controller: 'addressController as address'
    })
    .when('/create-subaccount', {
      templateUrl: 'assets/partials/create-subaccount.html'
    })
    .when('/create-group', {
      templateUrl: 'assets/partials/create-group.html',
      controller: 'groupController as group'
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
    .when('/horses/horse/:id', {
      templateUrl: 'assets/partials/horse.html',
      controller: 'horseController as horse',
      activetab: 'horses'
    })
    .when('/horses/new', {
      templateUrl: 'assets/partials/newHorse.html',
      controller: 'horseController as horse',
      activetab: 'horses'
    })
    .when('/users', {
      templateUrl: 'assets/partials/users.html',
      controller: 'usersController as users'
    })
    .when('/horses/:id/edi', {
      templateUrl: 'assets/partials/edi.html',
      controller: 'ediController as edi',
      activetab: 'horses',
      activeFooter: 'edi'
    })
    .when('/horses/:id/biometrics', {
      templateUrl: 'assets/partials/biometrics.html',
      controller: 'biometricsController as biometrics',
      activetab: 'horses',
      activeFooter: 'biometrics'
    })
    .when('/horses/:id/behaviors', {
      templateUrl: 'assets/partials/behaviors.html',
      controller: 'behaviorsController as behaviors',
      activetab: 'horses',
      activeFooter: 'behaviors'
    })
    .when('/notifications', {
      templateUrl: 'assets/partials/notifications.html',
      controller: 'notificationsController as notifications'
    })
    .when('/groups', {
      templateUrl: 'assets/partials/groups.html',
      controller: 'groupController as group'
    })
    .otherwise({redirectTo:'/'});

    //$locationProvider.html5Mode(true);
}]);

  app.run(['$http',function($http){
        $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $http.defaults.headers.common['Accept'] = 'application/json;odata=verbose';
    }])
