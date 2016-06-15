app.controller('userController',['$scope', function($scope){
  $scope.showUserForm = function() {
    $scope.skipButton = false;
    $scope.AddUserForm = true;
    console.log('click');
  }
}]);
