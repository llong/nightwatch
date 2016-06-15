app.controller('loginController', [
  '$scope','$http','$localStorage','$location','authenticate',
  function($scope,$http,$localStorage,$location,authenticate){
    var API = authenticate;

    $scope.login = function(){
      $http.post( API + 'api/login',{
        username: $scope.username,
        password: $scope.password
      })
      .then(function(response,error){
        $scope.userData = response.data;
        $localStorage.token = response.data;
        $location.path('/add-phone');
        console.log(response);
      }, function(response){
          $scope.message = true;
      });
    }
  }
])
