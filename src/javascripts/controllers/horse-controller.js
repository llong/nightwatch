app.controller('horseController',
  function($scope,$http,$localStorage,$location,API,$route,$routeParams,$rootScope){
    var API = API;
    var vm = this;
    vm.loadingHorse = true;
    vm.successMessage = false;
    $scope.$route = $route;

    $scope.viewHorse = function(horse){
      $location.path('/horses/horse/' + horse);
      console.log(horse);
      vm.loadingHorse = true;
    }

    $scope.reactivate = function(horse){
      $http.put(API + 'api/horse/' + horse + '/enable')
      .then(function(){
        vm.getHorses();
      })
      .finally(function(){
        vm.getDeactivatedHorses();
      })
      .catch(function(err){
        if(err.status === 401){
          $location.path('/login')
        } else {
          throw err;
        }
      })
    }
    // *************** GET **********************
    vm.getHorses = function(){
      $http.get(API + 'api/horse')
      .then(function(res){
        vm.horses = res.data;
        vm.whichHorse = vm.horses[$routeParams.id];
      })
      .catch(function(err){
        if(err.status === 401){
          $location.path('/login')
        }
      })
      .finally(function(){
        vm.loading = false;
        vm.loadingHorse = false;
        console.log(vm.horses);
      })
    }

    vm.getHorses();

    // GET Deactivated Horses
    vm.deactivatedHorses = {};
    vm.getDeactivatedHorses = function(){
      $http.get(API + 'api/horse/deleted')
      .then(function(res){
        vm.deactivatedHorses = res.data;
        console.log(vm.deactivatedHorses);
      })
      .catch(function(err){
        if(err.status === 401){
          $location.path('/login')
        } else if (err.status === 404){
          vm.deactivatedHorses = {};
        } else {
          throw err;
        }
      })
    }

    // *************** POST **********************
    vm.addHorse = function(){
      $http.post(API + 'api/horse',{
        registeredName: vm.registeredName,
        nickName: vm.nickName,
        sex: vm.sex,
        breed: vm.breed
      })
      .then(function(res){
        $scope.horses = res;
        console.log(res);
        $scope.horseForm = null;
      }, function(err){
        console.log(err);
      })
      .finally(function(){
        $location.path('/horses')
      })
    }

    // *************** PUT **********************
    vm.updateHorse = function(){
      $http.put(API + 'api/horse/' + vm.horses[horse].id, {
        registeredName: vm.whichHorse.registered_name,
        nickName: vm.whichHorse.nick_name,
        sex: vm.whichHorse.sex,
        breed: vm.whichHorse.breed
      })
      .catch(function(err){
        throw err;
      })
      .then(function(){
        console.log('horse updated');
        vm.successMessage = true;
      })
    }

    // *************** DELETE **********************

    // modal

    vm.removeHorse = function(horse){
      $http.delete(API + 'api/horse/' + horse)
      .then(function(){
        $location.path('/horses');
      })
    }



    $scope.backBtn = function(){
      $location.path('/horses');
      $scope.back = false;
    }
  });
