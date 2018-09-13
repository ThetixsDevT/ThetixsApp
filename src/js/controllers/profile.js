'use strict';

/* Controllers */

  // bootstrap controller
  app.controller('ProfileCtrl', ['$scope','MyService', '$http', '$state', function($scope,MyService,$http, $state ) {
       if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}

$scope.item=[];
    $scope.item=$scope.app.profile;
    $scope.item.email=$scope.item.emailResp;
    $scope.item.editing=false;
  $scope.change=function(item){
      $scope.item.editing=true;
      };

$scope.saveChangesV=function(item){
  var identif=item.id;
  item.companyName=item.company;
  $scope.item.editing=false;
  // alert("identif: " +identif);
  $http.put('https://www.thetixsapp.com:1350/vendor/'+identif, item);
};
$scope.saveChangesP=function(item){
  var identif=item.id;
  $scope.item.editing=false;
  $http.put('https://www.thetixsapp.com:1350/partner/'+identif, item);
};
$scope.saveChangesA=function(item){
  var identif=item.id;
  $scope.item.editing=false;
  $http.put('https://www.thetixsapp.com:1350/usertixs/'+identif, item);
};


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
  


