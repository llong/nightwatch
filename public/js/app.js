var app = angular.module('app',['ui.router']);

// Routing
app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("profile");

  $stateProvider
    .state('profile', {
      url: '/profile',
      templateUrl: "partials/templates/profile.html",
      controller: "mainController"
    })
    .state('device', {
      url: "/device",
      templateUrl: "partials/templates/device.html",
      controller: "mainController"
    })
    .state('edit-profile', {
      url: "/profile/edit",
      templateUrl: "partials/templates/edit-profile.html",
      controller: "mainController"
    });

});
// Services
app.service('states', function($http,$q){
  var states = {};
  $http.get('./js/states.json').then(function(data){
    states = data.data;
  });
  this.getStates = function(){
    return states;
  }
});


// Controllers
app.controller('mainController',['$scope','$http','states', function($scope,$http,states){
  $scope.states = states.getStates();
}]);


// Directives
app.directive('formInput', function(){
  return {
    restrict: 'E',
    scope: {
      label: '@',
      placeholder: '@',
      value: '@'
    },
    templateUrl: './partials/directives/formInput.html'
  }
})
