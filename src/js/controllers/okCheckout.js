'use strict';

/* Controllers */
  // signin controller
app.controller('OkCheckoutController', ['$scope', '$http', '$state', 'MyService',function($scope, $http,$state,MyService) {
$scope.sendTixs=function(item){
  var tixsList = MyService.data.car;
  var sale = item;
  $scope.app.customerName=item.name;
  $scope.app.customerEmail=item.email;
  item.sale=tixsList;
  var productList =[];
  productList = tixsList.productList;
  $scope.vaucher=[];
  var ind = productList.length;
  var liner="<br/>";
  var obj="";
  for (var i=0;i<ind;i++){
    if (productList[i].total>0){
      obj = "Tixs # "+productList[i].idTixs+"  = "+productList[i].total;
      $scope.vaucher.push(obj);
      $scope.vaucher.push(liner);
      }
  };
  var idSale=MyService.data.car.idSale.toString();
  var seter=MyService.data.car.seter;
  var ho="https://www.thetixsapp.com/#";
  var s="/generator?idSale="+idSale;
  var t="seter="+seter;
  var host=ho+s;
  var link=host;
  var item = item;
  var total =  MyService.data.car.total;
  item.receiveremail=item.email;
  item.text="the purchase has been successfully registered, for more information and the printing of the tixs visit the following link: "+link;
  item.textVaucher=" $ "+total;
  item.ref=MyService.data.car.transactionId;

  var footer="Manager";
  $http({
        method:'POST',
        url:'libs/phpmailer/sendTixs.php',
        data: 'name='+item.name +'&receiveremail='+item.receiveremail+'&email='+item.email+'&footer='+footer+'&text='+item.text+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost+'&t='+t,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        });
  $http({
        method:'POST',
        url:'libs/phpmailer/sendVaucher.php',
        data: 'name='+item.name +'&receiveremail='+item.receiveremail+'&ref='+item.ref+'&email='+item.email+'&footer='+footer+'&text='+item.textVaucher+'&vaucher='+$scope.vaucher+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost+'&t='+t,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        });

  var customerObj={};
  customerObj.customerName=$scope.app.customerName;
  customerObj.idSale=idSale;
  $http.post('https://www.thetixsapp.com:1350/customer/', customerObj)
  $state.go('app.listTixs' );
  // $state.go('generator',{ser:item.sale.ser} );
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