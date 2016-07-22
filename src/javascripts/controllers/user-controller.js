app.controller('userController',['$scope','$http','API','$location','countries','$timeout', function($scope,$http,API,$location,countries,$timeout){
  var API = API;
  var vm = this;

  // Get country list
  countries.getCountries().then(function(res){
    vm.countries = res.data;
  })

  // ********* User ***********

  vm.user = {};

  // Get profile
  $http.get(API + '/api/account/contact')
  .then(function(res){
    vm.profile = res.data[0];
    console.log(vm.profile);
  })
  .catch(function(err){
    if (err){
      $location.path('/login');
    }
  })
  .finally(function(){
  })

  // PUT profile
  vm.updateProfile = function(){
      $http.put(API + '/api/account/contact', {
        title: vm.profile.title,
        first_name: vm.profile.first_name,
        last_name: vm.profile.last_name
      })
      .catch(function(err){
        throw err;
      })
      .finally(function(){
        alert('success');
      });
  }


  // ********* Emails ***********

  // Get emails

  var getEmails = function(){
      $http.get(API + '/api/account/contact/emails')
      .then(function(res){
        vm.emails = res.data;
        console.log(vm.emails);
        $scope.loadingEmails = true;

      })
      .catch(function(err){
        if (err.status === 401){
          $location.path('/login');
        }
      })
      .finally(function(){
        $scope.loadingEmails = false;
      });
  }

  getEmails();

  // POST email
  vm.addEmail = function(){
    $http.post(API + '/api/account/contact/emails', {
      emailAddress: vm.emailAddress
      })
      .then(function(){
        vm.loadingEmails = true;
      })
      .catch(function(err){
        throw err;
      })
      .finally(function(){
        getEmails();
      })

  }

  // Update email
  var updateEmail = function(email){
    $http.put(email.uri, {
      email: email
    })
  }

  // DELETE email
  vm.deleteEmail = function(email){
    $http.delete(email.uri)
    .then(function(){
      getEmails();
    })
  }

  // ********* Subaccounts ***********
  $scope.showUserForm = function() {
    $scope.skipButton = false;
    $scope.AddUserForm = true;
    console.log('click');
  }


  // ******** Update Address *********
  // Admin update address (addressType = either shipping_address or billing_address)
  $scope.updateAddress = function(addressType){
    console.log(addressType.uri);
    $http.put(addressType.uri, addressType)
    .then(function(){
        console.log(vm.addressType);

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

}]);
