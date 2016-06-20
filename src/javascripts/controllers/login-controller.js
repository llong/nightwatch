app.controller('loginController', [
  '$scope','$http','$localStorage','$location','authenticate',
  function($scope,$http,$localStorage,$location,authenticate){
    var API = authenticate;

    $scope.login = function(){
      $http.post( API + 'api/login',{
        username: $scope.username,
        password: $scope.password
      })
      .then(function(response){
        $scope.userData = response.data;
        $localStorage.token = response.data;

        console.log(response);
      })
      .catch(function(err){
        throw err;
        $scope.message = true;
      })
      .finally(function(){
        $location.path('/');
      });
    }
}]);
