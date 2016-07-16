
app.controller('loginController', function($scope,$auth,$location,API,$http){
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

  // Check if user is logged in, if so send to dashboard
  var checkLogin = function(){
    $http.get(API + 'api/account')
    .then(function(res){
      if(res.status === 200){
        $location.path('/');
      }
    })
  }
  checkLogin();
});
