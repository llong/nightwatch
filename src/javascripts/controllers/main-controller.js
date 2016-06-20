app.controller('mainController',
['$scope','$http','$localStorage','$location','authenticate',
function($scope,$http,$localStorage,$location,authenticate){

  var API = authenticate;

  $scope.getData = function(){
    $http.get(API + 'api/account',{

    })
    .then(function(res){
      $scope.userData = res.data;
      console.log($scope.userData);
    });
  };

  // Hamburger Menu
  $scope.toggleMenu = function(){
    $scope.expanded = !$scope.expanded;
  }
}]);
