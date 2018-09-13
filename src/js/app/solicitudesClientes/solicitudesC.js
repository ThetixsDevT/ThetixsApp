
app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig','dato','datosCuenta',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosCuenta) {
$scope.date = moment();
}]);
app.controller('SolicitudesCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster','$timeout',  function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster,$timeout) {
 $scope.nivel=MyService.data.nivel;
  var dato="";
  var datosCuenta="";
  $scope.toaster = {
    type3: 'info',
    text3: 'Mensaje agregado con exito',
    title3: 'Información',
  };
  $scope.item={};
  $scope.filter = '';
   
  $scope.today = function() {
    $scope.fechaNacimiento = new Date();
  };
 

  $scope.clear = function () {
    $scope.fechaNacimiento = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
    $scope.guardado=false;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = 'shortDate';

  $scope.guardado="false";
  $scope.guardar=function (item) {
    $scope.guardado="true";

    alert(+$scope.guardado);
  };
   $scope.mostrar=function (item) {
   $scope.guardado="false";
  };
  

 

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.pop2 = function(){
    toaster.pop($scope.toaster.type3, $scope.toaster.title3, $scope.toaster.text3);
  };
  $scope.consultarSolicitudes= function(){
       $http.get('http://192.168.1.100:1337/solicitud/?idUsuario='+MyService.data.idUsuario).then(function (resp) {   
      $scope.solicitudes = resp.data.results;
      $scope.detallesSolicitud = null;
     $scope.lateral = true;
    });
  };
  // $scope.consultarSolicitudes();

$scope.consultarEnProceso = function(){
  $scope.solicitudes=[];
  $http.get('http://192.168.1.100:1337/solicitud/?idUsuario='+MyService.data.idUsuario).then(function (resp) {   
      $scope.solicitudesPre = resp.data.results;
      $scope.detallesSolicitud = null;
      $scope.lateral = true;
       for (var i=0; i<$scope.solicitudesPre.length; i++) 
        {
          if ($scope.solicitudesPre[i].estado=="En proceso")
            {
              $scope.solicitudes.push($scope.solicitudesPre[i]);
            }
        }
    });
};
$scope.consultarEnProceso();
$scope.consultarPendientes = function(){
  $scope.solicitudes=[];
  $http.get('http://192.168.1.100:1337/solicitud/?idUsuario='+MyService.data.idUsuario).then(function (resp) {   
      $scope.solicitudesPre = resp.data.results;
      $scope.detallesSolicitud = null;
      $scope.lateral = false;   
       for (var i=0; i<$scope.solicitudesPre.length; i++) 
        {
          if ($scope.solicitudesPre[i].estado=="Pendiente")
            {
              $scope.solicitudes.push($scope.solicitudesPre[i]);
            }
        }
    });
};
$scope.consultarEnProceso();
$scope.consultarFinalizadas = function(){
  $scope.solicitudes=[];
  $http.get('http://192.168.1.100:1337/solicitud/?idUsuario='+MyService.data.idUsuario).then(function (resp) {   
      $scope.solicitudesPre = resp.data.results;
      $scope.detallesSolicitud = null;
      $scope.lateral = true;
       for (var i=0; i<$scope.solicitudesPre.length; i++) 
        {
          if ($scope.solicitudesPre[i].estado=="Finalizada")
            {
              $scope.solicitudes.push($scope.solicitudesPre[i]);
            }
        }
    });
};

    $scope.openMensaje = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalMensaje.html',
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
        $scope.item = null;  
        
        setTimeout(function() {
           $scope.consultarMensajesDeNuevo(MyService.data.idSolicitud);
           $scope.pop2();
         }, 1000);
       
        // $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  }

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  }

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteSolicitud = function(item){
    $http.delete('http://192.168.1.100:1337/solicitud/'+item.id , item)
    $scope.solicitudes.splice($scope.solicitudes.indexOf(item), 1);
  };

  $scope.detallesSolicitud={};
  MyService.data.solicitud={};

  $scope.consultarMensajes=function(item){
     $http.get('http://192.168.1.100:1337/mensaje/?idSolicitud='+item.id).then(function (resp) {
      $scope.items = resp.data.results;
      // $scope.item = null;  
    });
  };
  $scope.consultarMensajesDeNuevo=function(item){
     $http.get('http://192.168.1.100:1337/mensaje/?idSolicitud='+item).then(function (resp) {
      $scope.items = resp.data.results;
      // $scope.item = null;  
    });
  };
  $scope.selectSolicitud = function(item){ 
    MyService.data.idSolicitud=item.id;
    $scope.detallesSolicitud=item;  
    identif=item.id;
    $scope.detallesSolicitud.fecha=$filter('date')(new Date($scope.detallesSolicitud.createdAt),'dd/MM/yyyy');
    $scope.detallesSolicitud.dia=$filter('date')(new Date($scope.detallesSolicitud.createdAt),'yyyy');
    MyService.data.solicitud.titulo=item.titulo;
    angular.forEach($scope.solicitudes, function(item) {
      item.selected = false;
    });
    $scope.solicitud = item;
    $scope.solicitud.selected = true;
    $scope.filter = item.titulo;
    $scope.consultarMensajes(item);
  };
  
  $scope.deleteItem = function(item){
    $http.delete('http://192.168.1.100:1337/consultor/'+item.id , item)
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'nombres')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.solicitud = function(item){
    item.editing = false;
    var solicitud= {};
    MyService.data.idenSolicitud= item.id;
    solicitud.nombre=item.nombre;
    solicitud.idEstablecimiento=item.idEstablecimiento;
    solicitud.idUsuario=item.idUsuario;
    solicitud.idUsuarioAct=MyService.data.idUsuario;
    item.id=null;
    solicitud.selected=item.selected;
    solicitud.editing=item.editing;
    if (MyService.data.idenSolicitud){
      $http.put('http://192.168.1.100:1337/solicitud/'+MyService.data.idenSolicitud, solicitud)
    }
    else {
      $http.post('http://192.168.1.100:1337/solicitud/', solicitud)
    }
    $scope.items = null;
    $scope.item = null;
    $scope.ingredientes = null;
   };



}]);
