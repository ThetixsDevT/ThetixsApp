'use strict';
app.controller('graficoAnimalCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', function($scope, $http, $filter,$modal, MyService,filterFilter) {
}]);

app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosSolicitud) {
$scope.date = moment();
}]);
app.controller('listadoSolicitudesCtrl', ['$scope', '$http','$state', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http,$state, $filter,$modal, MyService,filterFilter, datepickerConfig) {
   
      var dato="";
  var datosCuenta="";
    $scope.today = function() {
      $scope.fechaInicio = new Date();
    };
    // $scope.today();

    $scope.clear = function () {
      $scope.fechaFin = null;
    };



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
      $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []                                              
    };
    
    $scope.filter = '';
      $scope.tbOptions4 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    //  $scope.tbOptions3 = {
    //   bDestroy: true,
    //   pageLength: 5,
    //   data: []
                                                     
    // };
    // $scope.tbOptions4 = {
    //   bDestroy: true,
    //   pageLength: 5,
    //   data: []
                                                     
    // };
    // $scope.tbOptions5 = {
    //   bDestroy: true,
    //   pageLength: 5,
    //   data: []
                                                     
    // };

 $scope.vigilante=MyService.data.contador;
 $scope.vigilante=$scope.vigilante+1;
 MyService.data.contador=$scope.vigilante;
    $scope.getSolicitudes = function () {
      $scope.solicitudes=null;
      $http.get('http://192.168.1.100:1337/solicitud/').then(function (resp) {
        $scope.solicitudes = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.solicitudes2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.solicitudes;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        if ($scope.solicitudes && $scope.solicitudes.length > 0){
          for (var i=0;i < $scope.solicitudes.length;i++){
            var conversationDate1 =  $scope.solicitudes[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.solicitudes[i]);
            }
            $scope.solicitudes2=result;
          }
        }
        var identif=0;
        for (var i  = 0; i<$scope.solicitudes2.length;i++){
          bandera = $scope.solicitudes2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.solicitudes2[i].createdAtFormateada=bandera2;
          identif=$scope.solicitudes2[i].id;  
   $scope.solicitudes2[i].accion="<button tooltip=\"Ver detalles\" tooltip-placement=\"bottom\" onclick=\"angular.element(this).scope().openDetalles('" +identif +"')\"  class=\"btn btn-info btn-xs\" > <i class=\"fa fa-eye text\"></i></button>  <button onclick=\"angular.element(this).scope().openConfirmEliminar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" tooltip=\"Eliminar\" tooltip-placement=\"left\"> <i class=\"fa fa-trash-o text\"></i></button> ";                        
  // $scope.solicitudes2[i].accion="<button onclick=\"angular.element(this).scope().openDetalles('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Ver detalles</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
  // $scope.solicitudes2[i].accion2="<button onclick=\"angular.element(this).scope().openConfirmEliminar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Eliminar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
  // $scope.solicitudes2[i].accion="<button tooltip=\"Ver detalles\" onclick=\"angular.element(this).scope().openDetalles('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\" > <span class=\"text\" ></span>  <span class=\"text-active\">Cargando...</span><i class=\"fa fa-eye text\"></i></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i> <button onclick=\"angular.element(this).scope().openConfirmEliminar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"tooltip=\"Eliminar\" tooltip-placement=\"left\"> <span class=\"text\"></span>  <span class=\"text-active\">Cargando...</span><i class=\"fa fa-trash-o text\"></i></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
  // $scope.solicitudes2[i].accion2="<button onclick=\"angular.element(this).scope().openConfirmEliminar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"tooltip=\"Eliminar\" tooltip-placement=\"left\"> <span class=\"text\"></span>  <span class=\"text-active\">Cargando...</span><i class=\"fa fa-trash-o text\"></i></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        


        }
        $scope.solicitudes2=$scope.solicitudes2.reverse();
        $scope.tbOptions3.data = $scope.solicitudes2;
        $scope.tbOptions3.aoColumns=[
          { mData: 'titulo' }  ,
          { mData: 'descripcion' }  ,
          { mData: 'categoria'},
          { mData: 'estado'},
          { mData: 'accion' }
          // ,
          // { mData: 'accion2' }   
          ];
      });
    };
// $scope.carga=function(){
// $scope.getSolicitudes();

// };
// $scope.carga();
// $scope.item=[];

// $scope.openAprobacion = function (iden,timeout) {
//   var item=[];
//   var dato="";
//   var datosCuenta="";
//   $http.get('http://192.168.1.100:1337/solicitud/'+iden).success(function(respuesta){          
//   $scope.solicitud = respuesta;
//   $scope.item.fechaLiquidacion=respuesta.createdAt;
//   $scope.item.numeroMeses=respuesta.numeroMeses;
//   $scope.item.montoSolicitado=respuesta.montoSolicitado;
//   $scope.item.montoIntereses=respuesta.montoIntereses;
//   $scope.item.montoCuota=respuesta.montoCuota;
//   $scope.item.montoTotalAPagar=respuesta.montoTotalAPagar;
//   $scope.item.equivalente=respuesta.equivalente;
//   $scope.item.fiadorUno=respuesta.fiadorUno;
//   $scope.item.fiadorDos=respuesta.fiadorDos;
//   $scope.item.estado=respuesta.estado;
//   $scope.item.fiadorUno=respuesta.estado;
//   $scope.item.numero=respuesta.numero;
//   $scope.item.proposito=respuesta.proposito;
//   $scope.item.tasaInteres=respuesta.tasaInteres;
//   $scope.item.precioCcp=respuesta.precioCcp;
//   $scope.item.tipoDeCredito=respuesta.tipoDeCredito;           
//   });
//   setTimeout(function() {
//   var dias=0;
//   dias=($scope.item.numeroMeses*30);
//   var fecha = $scope.item.fechaLiquidacion;
//   $scope.sumaFecha(dias,fecha);
//   item=$scope.item;
//   datosCuenta=$scope.item;
//   $scope.item.datosCuenta=datosCuenta;
//   }, 300);
// setTimeout(function() {  var modalInstance = $modal.open({
//     templateUrl: 'modalAprobacion.html',
//     controller: 'ModalInstanceCtrl',
//     size: 'lg',
//     resolve: {

//            dato: function  () {
//             return item;
//             // body...
//           },
//            datosCuenta: function  () {
//             return datosCuenta;
//             // body...
//           },
//           items: function () {
//             return $scope.items;
//           }
//         }
//       });
//     modalInstance.result.then(function (selectedItem) {
//       $scope.selected = selectedItem;
//     }, function () {
//      // $log.info('Modal dismissed at: ' + new Date());
//     });}, 300);
//   };

// $scope.openNegar = function (iden,timeout) {
//   var item=[];
//   var dato="";
//   var datosCuenta="";
//   $http.get('http://192.168.1.100:1337/solicitud/'+iden).success(function(respuesta){        
//     $scope.solicitud = respuesta;
//     $scope.item.fechaLiquidacion=respuesta.createdAt;
//     $scope.item.numeroMeses=respuesta.numeroMeses;
//     $scope.item.montoSolicitado=respuesta.montoSolicitado;
//     $scope.item.montoIntereses=respuesta.montoIntereses;
//     $scope.item.montoCuota=respuesta.montoCuota;
//     $scope.item.montoTotalAPagar=respuesta.montoTotalAPagar;
//     $scope.item.equivalente=respuesta.equivalente;
//     $scope.item.fiadorUno=respuesta.fiadorUno;
//     $scope.item.fiadorDos=respuesta.fiadorDos;
//     $scope.item.estado=respuesta.estado;
//     $scope.item.fiadorUno=respuesta.estado;
//     $scope.item.numero=respuesta.numero;
//     $scope.item.proposito=respuesta.proposito;
//     $scope.item.tasaInteres=respuesta.tasaInteres;
//     $scope.item.precioCcp=respuesta.precioCcp;
//   });
//   setTimeout(function() {
//     var dias=0;
//     dias=($scope.item.numeroMeses*30);
//     var fecha = $scope.item.fechaLiquidacion;
//     $scope.sumaFecha(dias,fecha);
//     item=$scope.item;
//     datosCuenta=$scope.item;
//     $scope.item.datosCuenta=datosCuenta;
//   }, 300);


// setTimeout(function() {  var modalInstance = $modal.open({
//     templateUrl: 'modalNegar.html',
//     controller: 'ModalInstanceCtrl',
//     size: 'sm',
//     resolve: {

//            dato: function  () {
//             return item;
//             // body...
//           },
//            datosCuenta: function  () {
//             return datosCuenta;
//             // body...
//           },
//           items: function () {
//             return $scope.items;
//           }
//         }
//       });
//     modalInstance.result.then(function (selectedItem) {
//       $scope.selected = selectedItem;
//     }, function () {
//      // $log.info('Modal dismissed at: ' + new Date());
//     });}, 300);
//   };
    $scope.getSolicitudes();

    
    $scope.getSolicitudes2 = function () {
       $("#dataTable").dataTable().fnDestroy();
    $scope.solicitudesSegundo=null;
    $http.get('http://192.168.1.100:1337/solicitud/').then(function (resp) {
      $scope.solicitudesSegundo = resp.data.results;  
      var bandera="";
      var bandera2="";
      var result2 = [];
      var conversations2 = $scope.solicitudesSegundo;
      var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy'); 
        var conversations = $scope.solicitudes;
        var start_date2 =  Date.parse(firstDay);
        var end_date2 = Date.parse(lastDay); 
      end_date2=end_date2+86400000;
      if ($scope.solicitudesSegundo && $scope.solicitudesSegundo.length > 0){
        var conversationDate =0;
        for (var i=0;i < $scope.solicitudesSegundo.length;i++){
          conversationDate=Date.parse($scope.solicitudesSegundo[i].createdAt);
          if (conversationDate >= start_date2 && conversationDate <= end_date2){
            result2.push($scope.solicitudesSegundo[i]);
          }
          $scope.solicitudes2=result2;   
        }
      }

        var identif=0;
        for (var i  = 0; i<$scope.solicitudes2.length;i++){
          bandera = $scope.solicitudes2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.solicitudes2[i].createdAtFormateada=bandera2;
          identif=$scope.solicitudes2[i].id;  
          $scope.solicitudes2[i].accion="<button tooltip=\"Ver detalles\" tooltip-placement=\"bottom\" onclick=\"angular.element(this).scope().openDetalles('" +identif +"')\"  class=\"btn btn-info btn-xs\" > <i class=\"fa fa-eye text\"></i></button>  <button onclick=\"angular.element(this).scope().openConfirmEliminar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" tooltip=\"Eliminar\" tooltip-placement=\"left\"> <i class=\"fa fa-trash-o text\"></i></button> ";                        
  // $scope.solicitudes2[i].accion2="<button onclick=\"angular.element(this).scope().openConfirmEliminar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"tooltip=\"Eliminar\" tooltip-placement=\"left\"> <span class=\"text\"></span>  <span class=\"text-active\">Cargando...</span><i class=\"fa fa-trash-o text\"></i></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        

        }
        $scope.solicitudes2=$scope.solicitudes2.reverse();
        $scope.tbOptions3.data = $scope.solicitudes2;
        $scope.tbOptions3.aaData = result2;
    }); 

  };
  if ($scope.vigilante>1){
  $scope.getSolicitudes2();
 }
 $scope.agregarSolicitud = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalNuevaSolicitud.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

$scope.openDetalles = function(item,timeout){
  var nuevo={};
  nuevo.identif=item;
  $http.put('http://192.168.1.100:1337/solicitud/'+item ,nuevo); 
  setTimeout(function() {
    $http.get('http://192.168.1.100:1337/solicitud/?identif=' +item).success(function(respuesta){
    $scope.datos = respuesta.results[0];
    MyService.data.datosSolicitud=$scope.datos;
    MyService.data.contador=0;
    $state.go('apps.detallesSolicitud');  
    });
  }, 300);

  };



  $scope.openConfirmEliminar = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirmEliminar.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
}]);
