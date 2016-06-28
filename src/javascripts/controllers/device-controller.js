app.controller('deviceController', [
  '$scope','$http','$localStorage','$location','API','$route',
  function($scope,$http,$localStorage,$location,API,$route){
    var API = API;
    $scope.regex = /^[a-zA-Z0-9]{12}?/;
    $scope.$route = $route;

    // *************** GET Devices **********************
    var vm = this;

    $http.get(API + 'api/device')
    .then(function(res){
      vm.devices = res.data;
      console.log(vm.devices);
    })
    .catch(function(err){
      if(err.status === 401){
        $location.path('/login');
      }
      console.log(err);
    });

    // *************** POST **********************
    $scope.successMessage = false;
    vm.addDevice = function(){

          $http.post(API + 'api/device',{
            serialNumber: vm.serialNumber,
            nickName: vm.nickName
          })
          .then(function(res){
            vm.successMessage = true;
            vm.serialNumber = '';
            vm.nickName = '';
          })
          .catch(function(err){
            throw err;
          })
          .finally(function(res){
            $http.get(API + 'api/device')
            .then(function(res){
              vm.devices = res.data;
            })
          });
    }
  }]);
