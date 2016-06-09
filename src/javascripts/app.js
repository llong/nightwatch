var app = angular.module('app', ['ngRoute']);


app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
  $routeProvider
    .when('/login', {
      templateUrl: '/assets/partials/login.html'
    })
    .when('/create-username', {
      templateUrl: '/assets/partials/create-username.html'
    })
    .when('/create-name-password', {
      templateUrl: '/assets/partials/create-name-password.html'
    })
    .when('/add-phone', {
      templateUrl: '/assets/partials/add-phone.html'
    })
    .when('/primary-address', {
      templateUrl: '/assets/partials/primary-address.html'
    })
    .when('/billing-address', {
      templateUrl: '/assets/partials/billing-address.html'
    })
    .when('/create-subaccount', {
      templateUrl: '/assets/partials/create-subaccount.html'
    })
    .when('/create-group', {
      templateUrl: '/assets/partials/create-group.html'
    })
    .when('/add-device', {
      templateUrl: '/assets/partials/add-device.html'
    })
    .when('/add-horse', {
      templateUrl: '/assets/partials/add-horse.html'
    })
    .when('/notification-settings', {
      templateUrl: '/assets/partials/notification-settings.html'
    })
    .otherwise({redirectTo:'/login'});

  //  $locationProvider.html5Mode(true);
}]);


app.controller('userController',['$scope', function($scope){
  $scope.showUserForm = function() {
    $scope.skipButton = false;
    $scope.AddUserForm = true;
    console.log('click');
  }
}]);

app.controller('groupController',['$scope', function($scope){
  $scope.group = false;
  $scope.groups = [];
  $scope.assignGroupLink = '';

  // Enables/Disables associated address form for group
  $scope.assignGroup = function(){
    if ($scope.group) {
      $scope.group = false;
      this.innerHTML = 'Don\'t Assign Address To Group';
    } else {
      $scope.group = true;
      this.innerHTML = 'Don\'t Assign Address To Group';
    }
  }
  // Adds a new group to user groups
  $scope.addGroup = function(){
    $scope.groups.push({
      groupName: $scope.groupName,
      address: $scope.address,
      address2: $scope.address2,
      city: $scope.city,
      state: $scope.state,
      country: $scope.country
    });

    // Clear form fields
    $scope.groupName = '';
    $scope.address = '';
    $scope.address2 = '';
    $scope.city = '';
    $scope.state = '';
    $scope.country = '';
    // hide address fields
    $scope.group = false;
  }

}]);
