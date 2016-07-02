app.controller('verifyController', function($routeParams,$http,$location){
  var vm = this;


  $http.get($routeParams)
  .catch(function(err){
    vm.message = 'Sorry that is not a valid registration link';
  })
  .then(function(){
    $location.path('/add-phone');
    console.log('Account successfully verified :)')
  })

})
