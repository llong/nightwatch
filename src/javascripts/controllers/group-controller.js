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
