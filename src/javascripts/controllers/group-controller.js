app.controller('groupController', function($scope,$http,API,countries,$location){
  var API = API;
  $scope.groups = [];
  $scope.assignGroupLink = '';
  $scope.AssignMessage = 'Assign Address To Group';
  var vm = this;

  // Get country list
  countries.getCountries().then(function(res){
    vm.countries = res.data;
  })

  // Enables/Disables associated address form for group
  $scope.assignGroup = function(){
    if ($scope.groupAddress === false) {
      $scope.groupAddress = true;
      $scope.AssignMessage = 'Don\'t Assign Address To Group';
    } else {
      $scope.groupAddress = false;
      $scope.AssignMessage = 'Assign Address To Group';
    }
  }

  // Get Groups
  var getGroups = function(){
    $http.get(API + 'api/groups/horse')
    .then(function(res){
      $scope.groups = res.data;
      console.log($scope.groups);
    })
  }

  getGroups();

  // Adds a new group to user groups
  vm.groupDetails = {};
  $scope.addGroup = function(){
    $http.post(API + 'api/groups/horse', vm.groupDetails)
    .catch(function(err){
      if(err.status === 401){
        $location.path('/login')
      } else {
        throw err;
      }
    })
    .then(function(){
      getGroups();
      console.log(vm.groupDetails);
    })
  }

});
