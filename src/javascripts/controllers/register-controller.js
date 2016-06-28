app.controller('registerController',['$scope','$http','API',
function($scope,$http,API){

  var API = API;

  // Register New User
  $scope.register = function(){
      $http.post(API + 'account/register', {
        username: $scope.username,
        email: $scope.email,
        salutation: $scope.salutation,
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        password: $scope.password,
        password2: $scope.password2
      }).then(function(res){
        console.log(res);
      })
    }


}]);
