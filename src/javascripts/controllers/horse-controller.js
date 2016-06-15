app.controller('horseController', [
  '$scope','$http','$localStorage','$location','authenticate',
  function($scope,$http,$localStorage,$location,authenticate){
    var API = authenticate;

    // *************** POST **********************
    $scope.addHorse = function(){
      $http.post(API + 'api/horse',{
        registeredName: $scope.registeredName,
        nickName: $scope.nickName,
        sex: $scope.sex,
        breed: $scope.breed
      })
      .then(function(res){
        $scope.horses = res;
        console.log(res);
        $scope.horseForm = null;
      }, function(err){
        console.log(err);
      })
    }


  }]);
