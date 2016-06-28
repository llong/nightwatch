// app.controller('loginController', [
//   '$scope','$http','$localStorage','$location','authenticate',
//   function($scope,$http,$localStorage,$location,authenticate){
//

app.controller('loginController', function($scope,$auth,$location,API){
  var vm = this;
  $scope.loggingIn = false;

  vm.login = function() {
    $scope.loggingIn = true;
    var credentials = {
      username: vm.username,
      password: vm.password
    }

    // Use Satellizer's $auth service to login
    $auth.login(credentials)
    .then(function(data){
      $scope.loggingIn = true;
      $location.path('/');
    })
    .catch(function(err){
      if(err.status == 401){
        $scope.invalidPassword = true;
      }
    })
    .finally(function(){
      $scope.loggingIn = false;
    })
  }
});
