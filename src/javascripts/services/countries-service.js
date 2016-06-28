app.factory('countries', function($http,API){
  var API = API;
  var countries = {};

  countries.getCountries = function(){
    return $http.get(API + 'api/country/optList')
  }
  return countries;
})
