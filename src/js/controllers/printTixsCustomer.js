'use strict';

/* Controllers */
  // signin controller
app.controller('PrintTixsCustomerController', ['$scope', '$http', '$state', 'MyService',function($scope, $http,$state,MyService) {
  $scope.app.visible=false;
    $scope.app.datePrint=new Date();
var idPartnerToSearch = $scope.app.idPartnerToPrint; 


$scope.app.customerName=MyService.data.customerName;
$http.get('https://www.thetixsapp.com:1350/partner/'+idPartnerToSearch).success(function(respuesta){        
       $scope.app.partnerToPrint=respuesta;
       $scope.app.visible=true;
        });

 $scope.downloadQuotation = function (item) {
  var item = item;
        html2canvas(document.getElementById('rosterPrintView'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500
                    }]
                };
                pdfMake.createPdf(docDefinition).download("TheTixs.pdf");
            }
        });     
  };

  }]);