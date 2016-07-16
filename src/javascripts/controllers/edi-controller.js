app.controller('ediController', function($scope,$http,API,$filter,$routeParams){

//Get Horse
var getHorses = function(){
  $http.get(API + 'api/horses')
  .then(function(res){
    $scope.horses = res.data;
    $scope.horse = $filter('filter')($scope.horses, function (d) {return d.id === parseInt($routeParams.id)})[0];
  })
}

getHorses();


// Chart
    $scope.backgroundColor = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ];
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [2.2,5.3,6.2,3.1,6.8,9.7,5.6]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
      responsive: true,
      lineTension: 0.1,
      title: {
        display: true,
        text: 'EDI Score (Equine Distress Index)'
      },
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    };
})
