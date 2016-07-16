app.controller('mainController',
function($scope,$http,$localStorage,$location,authenticate,API,$route){

  $scope.$route = $route;
  $scope.setHorse = function(horse){
    $localStorage.activeHorse = '';
    $localStorage.activeHorse = horse;
    $scope.activeHorse = $localStorage.activeHorse;
    console.log(horse);
    console.log($scope.activeHorse);
  }

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

  //Hide navbar on iOS devices
    //Hide navbar on iOS devices
    console.log(navigator.platform);
    if(
    navigator.platform === 'iPhone' ||
    navigator.platform === 'iPad' ||
    navigator.platform === 'iPod') {
      console.log('iOS Device')
      $scope.iOS = true;
    } else {
      $scope.iOS = false;
      console.log('Non iOS Device');
    }
});
