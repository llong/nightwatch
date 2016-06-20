app.controller('mainController',
['$scope','$http','$localStorage','$location','authenticate',
function($scope,$http,$localStorage,$location,authenticate){

  var API = authenticate;

  // Hamburger Menu
  $scope.toggleMenu = function(){
    $scope.expanded = !$scope.expanded;
  }
}]);
