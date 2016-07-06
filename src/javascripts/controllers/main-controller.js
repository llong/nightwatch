app.controller('mainController',
['$scope','$http','$localStorage','$location','authenticate','API',
function($scope,$http,$localStorage,$location,authenticate,API){


  $scope.getData = function(){
    $http.get(API + 'api/account',{

    })
    .then(function(res){
      $scope.userData = res.data;
      console.log($scope.userData);
    });
  };

  // GET countries


  // Hamburger Menu
  $scope.toggleMenu = function(){
    $scope.expanded = !$scope.expanded;
  }

  // User Menu
  $scope.userMenu = function(){
    $scope.userExpanded = !$scope.userExpanded;
    console.log('click');
  }

  // Sign out (remove JWT)
  $scope.signOut = function(){
    localStorage.clear();
    $location.path('/login');
    console.log('sign out');
  }
}]);
