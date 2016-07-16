app.controller('verifyController', function($routeParams,$http,$location,API){
  var vm = this;
  API = API;

  $http.get(API + 'account/register/' + $routeParams.verifyAccount)
  .catch(function(err){
    console.log($routeParams.verifyAccount);
    throw err;
    vm.message = 'Sorry that is not a valid registration link';
  })
  .then(function(){
    $location.path('/add-phone');
    console.log('Account successfully verified :)')
  })

})
