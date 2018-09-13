'use strict';

/* Controllers */
  // signin controller
app.controller('GeneratorCtrl', ['$scope', '$http', '$state', 'MyService','$stateParams','$location',function($scope, $http,$state,MyService,$stateParams,$location) {
    //for showing #successNotification div  

$scope.loadSale=function(){



      $http.get('https://www.thetixsapp.com:1350/sale?idSale='+MyService.data.idSale).success(function(respuesta){
        $scope.tix = respuesta.results;
        var sale=$scope.tix[0];

        if(sale.idSale==MyService.data.idSale && sale.seter==MyService.data.seter){
          // alert("si");
          MyService.data.listToPrint=sale;
            $state.go('printerTixs');
        }
        else{
         
        }
      });
      

    };

$scope.loadCustomer=function(){
    $http.get('https://www.thetixsapp.com:1350/customer?idSale='+MyService.data.idSale).success(function(respuesta){        
       $scope.customers=respuesta.results;
       MyService.data.customerName=$scope.customers[0].customerName;
        });
};

    //build payment form after controller loads
    var init = function () {
// alert("parametro"+$stateParams.ser);
      // alert("hola: ");
var dato=$location.search().idSale;
MyService.data.idSale=dato;
var dato2=$location.search().seter;
MyService.data.seter=dato2;
// alert("id: "+dato +"seter: "+dato2);
$scope.loadCustomer();
$scope.loadSale();

       console.log($stateParams);
       // $scope.paymentForm.build()
    };
    init();

  }]);