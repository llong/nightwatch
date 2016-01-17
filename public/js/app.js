var app = angular.module('app',['ui.router']);

// Routing
app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "partials/templates/login.html",
      controller: "mainController"
    })
    .state('device', {
      url: "/device",
      templateUrl: "partials/templates/device.html",
      controller: "mainController"
    });

});

// Controllers
app.controller('mainController',['$scope', function($scope){
  $scope.hello = 'hi there';
}]);


// Directives
app.directive('formInput', function(){
  return {
    restrict: 'E',
    scope: {
      label: '@',
      placeholder: '@'
    },
    templateUrl: './partials/directives/formInput.html'
  }
})
