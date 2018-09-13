'use strict';


app.controller('CommissionCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig','$state',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,$state) {
   if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
  // $scope.var=0;
   $scope.products=[];

    $scope.today = function() {
      $scope.fechaInicio = new Date();
    };
    // $scope.today();

    $scope.clear = function () {
      $scope.fechaFin = null;
    };

    // Disable weekend selection
    // $scope.disabled = function(date, mode) {
    //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    // };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
     $scope.open2 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened2 = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'MM/dd/yyyy';
    $scope.tbOptions = {
    filterText: ''};
    $scope.filter = '';
      $scope.tbOptions = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    // $scope.toCharge=[];


    $scope.f5=function(){
       $scope.var=$scope.var+1;
    };
    $scope.amountToCharge=0;
    $scope.quantityToCharge=0;
    $scope.charge=function(){   
      
   
      // alert("identificador: "+identif);
       for (var i=0;i < $scope.products2.length;i++){
          if ($scope.products2[i].status=="pending"){
              // $scope.amountToCharge=$scope.amountToCharge+$scope.products2[i].amount;
              // $scope.quantityToCharge=$scope.quantityToCharge+1;
          }
       }
 
    };
    
    $scope.getProducts = function () {
      // alert("hola");
     
         $scope.products=null;
      $scope.total=0;
      $http.get('https://www.thetixsapp.com:1350/product/?idPartner='+MyService.data.idUser).then(function (resp) {
        $scope.products = resp.data.results;
        $scope.total=resp.data.total;
        var bandera="";
        var bandera2="";
        $scope.products2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.products;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        var identif = 0;
        if ($scope.products && $scope.products.length > 0){
          for (var i=0;i < $scope.products.length;i++){
            var conversationDate1 =  $scope.products[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.products[i]);
            }
            $scope.products2=result;
          }
        }
        for (var i  = 0; i<$scope.products2.length;i++){
           identif=$scope.products2[i].id;
          bandera = $scope.products2[i].createdAt;
          var description="";
           for (var j  = 0; j<$scope.products2[i].productList.length;j++){
              description=description+" "+$scope.products2[i].productList[j].productName+"<br/>";
              $scope.products2[i].ListComplete= description;
           };
          
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.products2[i].createdAtFormateada=bandera2;
          if(!$scope.products2[i].observaciones){$scope.products2[i].observaciones="-"};
          if($scope.products2[i].status=="pending"){
            // $scope.products2[i].buttoms="<label class=\"i-checks m-b-none\"><input type=\"checkbox\" onclick=\"angular.element(this).scope().charge('" +identif +"')\"  ><i></i></label>";

            $scope.products2[i].buttoms="<button class=\"btn btn-success btn-rounded btn-xs\" ui-toggle-class=\"btn-warning\" onclick=\"angular.element(this).scope().charge('" +identif +"')\"  disabled=\"disabled\"> <span class=\"text\" >Charge</span>  <span class=\"text-active\">loading...</span></button>"
          };
           if($scope.products2[i].status=="terminated"){
            $scope.products2[i].buttoms=" <button onclick=\"angular.element(this).scope().charge('" +identif +"')\"  class=\"btn btn-default btn-rounded btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\" disabled=\"disabled\"> <span class=\"text\" >Terminated</span>  <span class=\"text-active\">loading...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>"
          };
          if($scope.products2[i].status=="process"){
            $scope.products2[i].buttoms=" <button onclick=\"angular.element(this).scope().charge('" +identif +"')\"  class=\"btn btn-warning btn-rounded btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\" disabled=\"disabled\"> <span class=\"text\" >In process</span>  <span class=\"text-active\">loading...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>"
          };
        }
        MyService.data.products=$scope.products2;
        $scope.products2=$scope.products2.reverse();
        $scope.products=$scope.products2;
        $scope.tbOptions.data = $scope.products2;
        $scope.tbOptions.aoColumns=[
          { mData: 'createdAtFormateada' },
          { mData: 'productName' },
          { mData: 'ListComplete' },
          { mData: 'itemsPrices' },
          { mData: 'idPartner' },
          // { mData: 'buttoms' },
          ];
      });
      // $scope.f5();
    };
 $scope.getProducts();


  

    $scope.getProducts2 = function () {
    $scope.products=null;
    $http.get('https://www.thetixsapp.com:1350/product/?idPartner='+MyService.data.idUser).then(function (resp) {
      $scope.products = resp.data.results;  
      var bandera="";
      var bandera2="";
      $scope.products2=[];
      var result2 = [];
      var conversations2 = $scope.products;
      var start_date2 =  Date.parse($scope.fechaInicio) ;  
      var end_date2 = Date.parse($scope.fechaFin);   
      end_date2=end_date2+86400000;
      var identif = 0;
      if ($scope.products && $scope.products.length > 0){
        var conversationDate =0;
        for (var i=0;i < $scope.products.length;i++){
          conversationDate=Date.parse($scope.products[i].createdAt);
          if (conversationDate >= start_date2 && conversationDate <= end_date2){
            result2.push($scope.products[i]);
          }
          $scope.products2=result2;   
        }
      }
      for (var i  = 0; i<$scope.products2.length;i++){
         var description="";
           for (var j  = 0; j<$scope.products2[i].productList.length;j++){
              description=description+" "+$scope.products2[i].productList[j].productName+"<br/>";
               $scope.products2[i].ListComplete=description;
           };
         
        identif=$scope.products2[i].id;
        bandera = $scope.products2[i].createdAt;
        bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
        $scope.products2[i].createdAtFormateada=bandera2;
         if(!$scope.products2[i].observaciones){$scope.products2[i].observaciones="-"};
          if($scope.products2[i].status=="pending"){
            // $scope.products2[i].buttoms=" <button onclick=\"angular.element(this).scope().charge('" +identif +"')\"  class=\"btn btn-success btn-rounded btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\" >Charge</span>  <span class=\"text-active\">loading...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>"
                     $scope.products2[i].buttoms="<label class=\"i-checks m-b-none\"><input type=\"checkbox\" onclick=\"angular.element(this).scope().charge('" +identif +"')\"  ><i></i></label>";

          };
           if($scope.products2[i].status=="terminated"){
            $scope.products2[i].buttoms=" <button onclick=\"angular.element(this).scope().charge('" +identif +"')\"  class=\"btn btn-default btn-rounded btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\" disabled=\"disabled\"> <span class=\"text\" >Terminated</span>  <span class=\"text-active\">loading...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>"
          };
           if($scope.products2[i].status=="process"){
            $scope.products2[i].buttoms=" <button onclick=\"angular.element(this).scope().charge('" +identif +"')\"  class=\"btn btn-warning btn-rounded btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\" disabled=\"disabled\"> <span class=\"text\" >In process</span>  <span class=\"text-active\">loading...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>"
          };
        }
      MyService.data.products=$scope.products2;
      $scope.products2=$scope.products2.reverse();
      $scope.tbOptions.data = $scope.products2;
      $scope.products=$scope.products2;
      $scope.tbOptions.aaData = $scope.products2;
      $scope.tbOptions.aoColumns=[
          { mData: 'createdAtFormateada' },
          { mData: 'productName' },
          { mData: 'ListComplete' },
          { mData: 'itemsPrices' },
          { mData: 'idPartner' },
          // { mData: 'buttoms' },
          ];
    }); 
    // $scope.f5();
  };
 
}]);
