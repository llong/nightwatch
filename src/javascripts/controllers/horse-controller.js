app.controller('horseController', [
  '$scope','$http','$localStorage','$location','API','$route','$routeParams',
  function($scope,$http,$localStorage,$location,API,$route,$routeParams){
    var API = API;
    var vm = this;
    vm.loading = true;
    $scope.$route = $route;
    // *************** GET **********************
    vm.getHorses = function(){
      $http.get(API + 'api/horse')
      .then(function(res){
        vm.horses = res.data;
        vm.whichHorse = $routeParams.id;
      })
      .catch(function(err){
        if(err.status === 401){
          $location.path('/login')
        }
      })
      .finally(function(){
        vm.loading = false;
      })
    }

    vm.getHorses();

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
