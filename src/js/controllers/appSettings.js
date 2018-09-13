'use strict';

/* Controllers */

  // bootstrap controller
  app.controller('AppSettingsCtrl', ['$scope','MyService', '$http', function($scope,MyService,$http) {
//        if (typeof MyService.data.email==="undefined"){
//   $state.go('access.signin');
// }
$scope.item=[];

  $scope.getinfo=function(){
      $http.get('https://www.thetixsapp.com:1350/conf').success(function(answer){
        $scope.item=answer.results[0];
        // MyService.data.adminAccount = answer.results[0].adminAccount;
        // MyService.data.managerAccount = answer.results[0].managerAccount;
        // MyService.data.supportAccount = answer.results[0].supportAccount;
        //  MyService.data.managerAccountHost = answer.results[0].managerAccountHost;
        // MyService.data.supportAccountHost = answer.results[0].supportAccountHost;
        // MyService.data.managerAccountPass = answer.results[0].managerAccountPass;
        // MyService.data.supportAccountPass = answer.results[0].supportAccountPass;
        //  MyService.data.menV = answer.results[0].menV;
        //  MyService.data.menP = answer.results[0].menP;
      });
    };
    $scope.getinfo();



    $scope.oneAtATime = true;

    $scope.groups = [
      {
        title: 'Accordion group header - #1',
        content: 'Dynamic group body - #1'
      },
      {
        title: 'Accordion group header - #2',
        content: 'Dynamic group body - #2'
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];


   

    $scope.addItem = function() {
      var newItemNo = $scope.items.lemanagerAccountHostngth + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }])
  ; 
  


