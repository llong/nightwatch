app.factory('authenticate', function(){
  var API = apiRoot;
  return API;
});

// Horse
app.factory('horseService',['$http', function($http) {
    var API = apiRoot;
    var getHorses = {
        async: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var horses = $http.get(API + '/api/horse').then(function (response) {
                // The then function here is an opportunity to modify the response
                //console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return horses;
        }
    };
    return getHorses;
}]);
