app.controller('deviceController',
  function($scope,$http,$localStorage,$location,API,$route,$fancyModal,$rootScope){
    var API = API;
    $scope.regex = /^[a-zA-Z0-9]{12}?/;
    $scope.$route = $route;

    var vm = this;
    vm.message = {
      status: false,
      text: ''
    }

    // Used to select Device for Edit and Delete
      vm.getDevice = function(device){
        vm.whichDevice = vm.devices[device];
        console.log(vm.whichDevice);
      }

    // Hides flash messages
    var hideAlert = function(){
      $scope.$apply(function(){
        vm.message.status = !vm.message.status;
        console.log(vm.message.status);
      });
    }



    // *************** GET Devices **********************


    vm.getDevices = function(){
        vm.loadingDevice = true;
        $http.get(API + 'api/device')
        .then(function(res){
          vm.devices = res.data;
          console.log(vm.devices);
        })
        .catch(function(err){
          if(err.status === 401){
            $location.path('/login');
          }
          throw err;
        })
        .finally(function(){
          vm.loadingDevice = false;
        })
    }

    vm.getDevices();

    // *************** CREATE **********************
    vm.successMessage = false;
    vm.addDevice = function(){
          vm.devices = [];
          $http.post(API + 'api/device',{
            serialNumber: vm.serialNumber,
            nickName: vm.nickName
          })
          .catch(function(err){
            //throw err;
            if (err.status == 400) {
              vm.message = {
                status: 'error',
                text: err.data.errors[0]
              }
              vm.getDevices();
            }
          })
          .then(function(res){
            if (res.status == 201){
                vm.message = {
                  status: true,
                  text: 'Device succesfully added'
                };
                vm.serialNumber = '';
                vm.nickName = '';
                vm.getDevices();
            }
          })
          .finally(function(res){
            setTimeout(hideAlert,6000);
          });
    }
    // *************** UPDATE **********************



    vm.updateDevice = function(){

      $http.put(API + 'api/device/' + vm.whichDevice.id, {
        serialNumber: vm.whichDevice.serial_number,
        nickName: vm.whichDevice.nick_name
      })
      .catch(function(err){
        throw err;
      })
      .then(function(res){
        getDevices();
      })
    }

    // *************** DELETE **********************
    vm.modal = function(device){
      vm.getDevice(device);
      $fancyModal.open({
        scope: $scope,
        templateUrl: 'assets/partials/deleteDevice.html'

      });
    };


    vm.removeDevice = function(device){
      $http.delete(API + 'api/device/' + vm.whichDevice.id)
      .catch(function(err){
        throw err;
      })
      .then(function(res){
        $fancyModal.close();
        vm.loadingDevice = true;
        vm.devices = [];
        vm.getDevices();
        vm.message = {
          status: true,
          text: 'Device successfully removed'
        };
      })
      .finally(function(){
        setTimeout(hideAlert,6000);
      })
    }


    // Modals
  });
