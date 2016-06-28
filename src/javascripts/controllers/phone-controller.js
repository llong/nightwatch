app.controller('phoneController', function($http,countries,API,$location){

var API = API;
var vm = this;

  countries.getCountries().then(function(res){
    vm.countries = res.data;
  })
  // GET phones
  vm.getPhones = function(){
    $http.get(API + 'api/account/contact/phones')
    .then(function(res){
      vm.phones = res.data;
      console.log(res.data)
      vm.loadingPhones = true;
    })
    .finally(function(){
      vm.loadingPhones = false;
    })
  };

  vm.getPhones();


  // POST new phone
  vm.addPhone = function() {
    $http.post(API + 'api/account/contact/phones', {
      countryCode: vm.code,
      areaCode: vm.areaCode,
      number: vm.number
    })
    .then(function(){
      console.log('success')
      vm.successMessage = true;
      vm.errorMessage = false;
      vm.code = '';
      vm.areaCode = '';
      vm.number = '';
    })
    .catch(function(err){
      if (err.status == 401){
        $locaiton.path('/login')
      } else if (err.status == 422) {
        vm.errorMessage = true;
        vm.successMessage = false;
        vm.errors = err.data.errors;
      }
    })
    .finally(function(){
      vm.getPhones();
    })
  }

  // DELETE phone
  vm.deletePhone = function(phone){
    $http.delete(phone.uri)
    .then(function(res){
      $http.get(API + 'api/account/contact/phones')
      console.log('delete phone');
    })
    .catch(function(err){
      throw err;
      console.log('delete');
    })
    .finally(function(){
      vm.getPhones();
      console.log('phone removed');
    })
  }

})
