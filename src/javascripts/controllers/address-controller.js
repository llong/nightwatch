app.controller('addressController', function($scope,$http,API,countries,$location,$timeout){
  var API = API;
  var vm = this;
  $scope.message = null;


  // Get country list
  countries.getCountries().then(function(res){
    vm.countries = res.data;
  })

  var getAddresses = function(){
    $http.get(API + 'api/account/addresses')
    .then(function(res){
      $scope.addresses = res.data;
      $scope.shippingAddress = res.data[0];
      $scope.billingAddress = res.data[1];
      console.log($scope.addresses);
    })
    .catch(function(err){
      $location.path('/login');
      throw err;
    })
  }

  getAddresses();

  // Update Shipping Address
  $scope.updateShippingAddress = function(){
    $http.put($scope.shippingAddress.uri, vm.address)
    console.log(vm.address);

    $scope.message = {
      status: 'success',
      color: 'success',
      text: 'Address successfully updated'
    }
  }


  // Update Billing Address
  $scope.updateBillingAddress = function(){
    var myAddress = '';
    if ($scope.sameAddress === true) {
      myAddress = {
          address1:    $scope.shippingAddress.address1
          ,address2:   $scope.shippingAddress.address2
          ,city:       $scope.shippingAddress.city
          ,state:      $scope.shippingAddress.state
          ,postalCode: $scope.shippingAddress.postalCode
          ,country:    $scope.shippingAddress.country
      }
      console.log(myAddress);
    } else {
      myAddress = vm.address;
    };
    $http.put($scope.billingAddress.uri, myAddress)
    .then(function(){
        console.log(vm.address);

        $scope.message = {
          status: 'success',
          color: 'success',
          text: 'Address successfully updated'
        }
    })
    .catch(function(err){
      if (err.status === 401) {
        $location.path('/login')
      } else {
        $scope.message = {
          status: 'failure',
          color: 'danger',
          text: err
        }
      }
    })
    .finally(function(){
      $timeout(function() {
        $scope.message.status = null;
      },6000);

    })
  }
});
