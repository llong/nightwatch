app.controller('dashboardController', [
  '$scope','$http','$localStorage','$location','API','$route',
  function($scope,$http,$localStorage,$location,API,$route){
    var API = API;
    $scope.$route = $route;
    $scope.sortType     = 'edi_score'; // set the default sort type
    $scope.sortReverse  = true;  // set the default sort order

    // *************** POST **********************
    var getHorses = function(){
      $http.get(API + '/api/horse')
      .then(function(res){
        $scope.horses = res.data;
        console.log($scope.horses);
        $scope.serialNumber = '';
        $scope.nickName = '';
      })
      .catch(function(err){
        if(err.status === 401 || localStorage == null){
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
