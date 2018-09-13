'use strict';

/* Controllers */

app.controller('FlotChartDemoCtrl', ['$scope','MyService', '$state', '$http', '$filter', function($scope,MyService,$state,$http, $filter) {
        if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
 if ($scope.app.profile.demoUser && $scope.app.profile.demoUser == true )
          {
              $scope.app.demoUser=true;
              // alert("yea");
          }

 $scope.app.visor = false;
     $scope.acept=function(){
      $scope.app.visor = true;
      $state.go('app.checkout');
      // alert("activado"+$scope.visor);
     }; 
      $scope.aceptSandBox=function(){
      $scope.app.visor = true;
      $state.go('app.checkoutSandBox');
      // alert("activado"+$scope.visor);
     }; 
     $scope.okSale=function(){
      var saleObj={};
      saleObj.detail="";
      for (var i=0; i<MyService.data.productsList.length; i++) 
          {
            saleObj.detail = saleObj.detail +" "+MyService.data.productsList[i].productName+","; 
          };
      saleObj.amount=MyService.data.total;
      saleObj.status="pending";
      saleObj.idUser=MyService.data.idUser;
      saleObj.transactionId= $scope.app.transactionId;
       $http.post('https://www.thetixsapp.com:1350/sale/', saleObj)
      
       $http({
        method:'POST',
        url:'libs/fpdf/tutorial/tuto1.php',
        data: 'amount='+saleObj.amount +'&status='+saleObj.status+'&idUser='+saleObj.idUser+'&transactionId='+saleObj.transactionId,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        });
       $state.go('app.invoice');
     };
     $scope.getSales = function () {
      $scope.sales=null;
      $http.get('https://www.thetixsapp.com:1350/sale/?idUser='+MyService.data.idUser).then(function (resp) {
        $scope.sales = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.sales2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.sales;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;

        if ($scope.sales && $scope.sales.length > 0){
          for (var i=0;i < $scope.sales.length;i++){
            var conversationDate1 =  $scope.sales[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.sales[i]);
            }
            $scope.sales2=result;
          }
        }
        for (var i  = 0; i<$scope.sales2.length;i++){
          bandera = $scope.sales2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.sales2[i].createdAtFormateada=bandera2;
          if(!$scope.sales2[i].observaciones){$scope.sales2[i].observaciones="-"};
        }
        $scope.sales2=$scope.sales2.reverse();
        // $scope.tbOptions.data = $scope.sales2;
        $scope.app.salesLength=$scope.sales2.length;
      });
    };
 $scope.getSales();
// $scope.getSalesG=function(){
//      $http.get('https://www.thetixsapp.com:1350/sale/?idUser='+MyService.data.idUser).then(function (resp) {
//         $scope.app.sales = resp.data.results;
//         $scope.app.salesLength=$scope.app.sales.length;
//       })
// };
// $scope.getSalesG();
$scope.borrar=function(index){
  var index = index;
  
  // alert("hola borrador de indice: "+index);
  $scope.app.total = $scope.app.total - $scope.app.productsList[index].total;  
  MyService.data.total=$scope.app.total;
  $scope.app.productsList.splice(index,1);
  MyService.data.productsList=$scope.app.productsList;
  $scope.app.products=$scope.app.products-1;
  MyService.data.products=$scope.app.products;

};
 $scope.add=function(){
  // alert("hola");
      $scope.app.products=$scope.app.products+1;
    };

// if are admin ##########################################>
if ($scope.app.level == '1'){  
  $scope.totalVendors=0;
  $scope.totalPartners=0;
  $scope.totalProducts=0;
  $scope.totalReservations=0;
  $scope.totalNewPartners=0;
  $scope.totalNewVendors=0;
  $http.get('https://www.thetixsapp.com:1350/partner').then(function (resp) {
    $scope.partners = resp.data.results;    
     $scope.totalPartners=$scope.partners.length;  // fake
       for (var i = 0; i < $scope.partners.length; ++i) {
        if ($scope.partners[i].status == "pending"){
          $scope.totalNewPartners=$scope.totalNewPartners+1;
        }
        }   
  });
    $http.get('https://www.thetixsapp.com:1350/vendor').then(function (resp) {
    $scope.vendors = resp.data.results;    
     $scope.totalVendors=$scope.vendors.length;  // fake
       for (var i = 0; i < $scope.vendors.length; ++i) {
        if ($scope.vendors[i].status == "pending"){
          $scope.totalNewVendors=$scope.totalNewVendors+1;
        }
        }   
  });
     $http.get('https://www.thetixsapp.com:1350/product').then(function (resp) {
    $scope.products = resp.data.results;    
     $scope.totalProducts=$scope.products.length;  // fake
  });
     $http.get('https://www.thetixsapp.com:1350/sale').then(function (resp) {
    $scope.sales = resp.data.results;    
     $scope.totalsales=$scope.sales.length;  // fake
  });
};
// if are partner ##########################################>
if ($scope.app.level == '2'){
  // alert("hola partner");
  $scope.totalProducts=0;
  $scope.totalReservations=0;
  var idUser=MyService.data.idUser;
     $http.get('https://www.thetixsapp.com:1350/product/?idPartner='+idUser).then(function (resp) {
    $scope.products = resp.data.results;    
     $scope.totalProducts=$scope.products.length; // fake
  });
};


// if are vendor ##########################################>
if ($scope.app.level == '3'){
  // alert("hola vendor");
};
    
  $scope.item=[];
  $scope.tags=[];
    $scope.split=function(item){
        
      $scope.result=[];
        var item = item.tagsIn;
        $scope.result = item.split(',');
        $scope.tags=[];
        var indice = $scope.result.length;
        for (var i = 0; i < $scope.result.length; ++i) {
        $scope.tags.push({name:$scope.result[i]});
        $scope.item.tags=$scope.tags;
        }   
        MyService.data.tags=$scope.tags;
        
       for (var i = 0; i < $scope.tags.length; ++i) {
      alert ("vector: " +$scope.tags[i].name);
       } 
     $scope.mostrar()
    };
    $scope.mostrar=function () {
      // body...
      $scope.tags = [];
      $scope.tags=MyService.data.tags;
         // alert(+$scope.tags[1].name);
    };
 


    $scope.d = [ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ];

    $scope.d0_1 = [ [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0] ];

    $scope.d0_2 =[ [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0] ];


    // $scope.d0_1 = [ [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0] ];

    // $scope.d0_2 =[ [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0] ];


    $scope.d0_1 = [ [0,4],[1,5],[2,6],[3,7],[4,4],[5,8],[6,15],[7,7],[8,8],[9,14],[10,16],[11,13],[12,13] ];

    //  $scope.d0_2 = [ [0,2],[1,2.5],[2,3],[3,3.5],[4,4],[5,4],[6,4],[7,4.5],[8,6],[9,4.5],[10,5],[11,6],[12,7] ];
  $scope.d0_2 = [ [0,1],[1,2],[2,5],[3,3.5],[4,4],[5,4],[6,7],[7,4.5],[8,6],[9,4.5],[10,5],[11,6],[12,10] ];

    $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

    $scope.d1_2 = [ [10, 50],  [20, 60], [30, 90],  [40, 35] ];

    $scope.d1_3 = [ [10, 80],  [20, 40], [30, 30],  [40, 20] ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
      $scope.d2.push([i, Math.round( Math.sin(i)*100)/100] );
    }   

    $scope.d3 = [ 
      { label: "iPhone5S", data: 40 }, 
      { label: "iPad Mini", data: 10 },
      { label: "iPad Mini Retina", data: 20 },
      { label: "iPhone4S", data: 12 },
      { label: "iPad Air", data: 18 }
    ];

    $scope.refreshData = function(){
      $scope.d0_1 = $scope.d0_2;
    };

    $scope.getRandomData = function() {
      var data = [],
      totalPoints = 150;
      if (data.length > 0)
        data = data.slice(1);
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }
        data.push(Math.round(y*100)/100);
      }
      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }
      return res;
    }

    $scope.d4 = $scope.getRandomData();




    
  }]);
