app.controller('deviceController',
  function($scope,$http,$localStorage,$location,API,$route){
    var API = API;
    $scope.regex = /^[a-zA-Z0-9]{12}?/;
    $scope.$route = $route;

    var vm = this;
    vm.message = {
      status: false,
      text: ''
    }
    console.log(vm.message.status);

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
            }
            throw res;

          })
          .finally(function(res){
            $http.get(API + 'api/device')
            .then(function(res){
              vm.devices = res.data;
            })
          });
    }
    // *************** UPDATE **********************
    vm.getDevice = function(device){
      vm.whichDevice = vm.devices[device];
      console.log(vm.whichDevice);
    }


    vm.updateDevice = function(){

      $http.put(API + 'api/device/' + vm.whichDevice.id, {
        serialNumber: vm.whichDevice.serial_number,
        nickName: vm.whichDevice.nick_name
      })
      .catch(function(err){
        throw err;
      })
      .then(function(){
        getDevices();
      })
    }

    // *************** DELETE **********************
    vm.removeDevice = function(device){
      $http.delete(API + 'api/device/' + vm.devices[device].id)
      .catch(function(err){
        throw err;
      })
      .then(function(){
        vm.getDevices();
        vm.message = {
          status: true,
          text: 'Device successfully removed'
        }
        //vm.message.status = false;
      })
      .finally(function(){

      })
    }


    // Modals
  });
