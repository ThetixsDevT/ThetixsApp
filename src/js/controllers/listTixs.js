'use strict';

/* Controllers */
  // signin controller
app.controller('ListTixsController', ['$scope', '$http', '$state', 'MyService',function($scope, $http,$state,MyService) {
$scope.printTix=function(item){
$scope.app.TixToPrint=item;
$scope.app.productToPrint=item.tixInformation;  
$scope.app.idTixToPrint=item.idTix;
$scope.app.imagesTixToPrint=item.images;
$scope.app.notesTixsToPrint=item.notes;
$scope.app.idPartnerToPrint=item.idPartner;
$state.go('app.printTixs' );
};


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