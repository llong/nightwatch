app.controller('registerController',['$scope','$http','authenticate', function($scope,$http,authenticate){

  var API = authenticate;

  // Register New User
  $scope.register = function(res,err){
    if ($scope.password === $scope.password2) {
      $http.post(API + 'account/register', {
        username: $scope.username,
        email: $scope.email,
        salutation: $scope.salutation,
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        password: $scope.password
      }).then(function(res){
        console.log(res);
      }, function(res){
        console.log(res);
      })
    }
  }


}]);
