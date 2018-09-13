'use strict';

/* Controllers */
  // signin controller
app.controller('PrinterTixsCtrl', ['$scope', '$http', '$state', 'MyService','$stateParams','$location',function($scope, $http,$state,MyService,$stateParams,$location) {
    //for showing #successNotification div  
$scope.printTix=function(item){
$scope.app.TixToPrint=item;
$scope.app.productToPrint=item.tixInformation;  
$scope.app.idTixToPrint=item.idTix;
$scope.app.imagesTixToPrint=item.images;
$scope.app.notesTixsToPrint=item.notes;
$scope.app.idPartnerToPrint=item.idPartner;
$state.go('printTixsCustomer' );
};



    //build payment form after controller loads
    var init = function () {

var sale=MyService.data.listToPrint;
$scope.sale=sale;
// alert("hola" +sale.productList);
// alert("parametro"+$stateParams.ser);
//       // alert("hola: ");
// var dato=$location.search().idSale;
// MyService.data.idSale=dato;
// var dato2=$location.search().seter;
// MyService.data.seter=dato2;
// alert("id: "+dato +"seter: "+dato2);
// $scope.loadSale();
       // console.log($stateParams);
       // $scope.paymentForm.build()
    };
    init();

  }]);