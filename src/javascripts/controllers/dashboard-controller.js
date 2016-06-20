app.controller('dashboardController', [
  '$scope','$http','$localStorage','$location','authenticate',
  function($scope,$http,$localStorage,$location,authenticate){
    var API = authenticate;

    // *************** POST **********************
    var getHorses = function(){
      $http.get(API + 'api/horse',{
        headers: {
          Authorization: 'Bearer ' + $localStorage.token.access_token
        }
      })
      .then(function(res){
        $scope.horses = res.data;
        console.log($scope.horses);
        $scope.serialNumber = '';
        $scope.nickName = '';
      })
      .catch(function(err){
        if(token == null){
            $location.path('/login');
            throw err;
        } else {
          console.log('all good');
        }
      })
      .finally(function(){
        $scope.loading = false;
      })
    }

    getHorses();

    $scope.ediColor = function (horse) {
        if (horse.edi_score < 4.0) {
            return 'label-success';
        } else if (horse.edi_score < 6.0) {
            return 'label-warning';
        } else {
            return 'label-danger';
        }
    }

    $scope.loading = true;
    $scope.getHorse = function(horse){
      $scope.activeHorse = horse;
      console.log(horse);
      console.log($scope.activeHorse);

      $http.get(API + '/api/horse/' + horse.id + '/metric/latest')
      .then(function(res){
        $scope.metrics = res.data;
        console.log($scope.metrics);
      })
      .catch(function(err){
        console.log(err)
      })
      .finally(function(){
        $scope.loading = false;
      })
    }

  }]);
