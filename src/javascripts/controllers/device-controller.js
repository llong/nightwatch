app.controller('deviceController', [
  '$scope','$http','$localStorage','$location','authenticate',
  function($scope,$http,$localStorage,$location,authenticate){
    var API = authenticate;
    $scope.regex = /^[a-zA-Z0-9]{12}?/;

    // *************** POST **********************
    $scope.addDevice = function(){

          $http.post(API + 'api/device',{
            serialNumber: $scope.serialNumber,
            nickName: $scope.nickName
          })
          .then(function(res){
            $scope.devices = res;
            console.log(res);
            $scope.serialNumber = '';
            $scope.nickName = '';
          }, function(err){
            console.log(err);

          });
    }
  }]);
