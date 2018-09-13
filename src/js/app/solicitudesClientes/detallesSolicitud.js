'use strict';

app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig) {
$scope.date = moment();
}]);

app.controller('detallesSolicitudCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig) {

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
      $scope.tbOptions = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.filter = '';
      $scope.tbOptions2 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
     $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.tbOptions4 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.tbOptions5 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.tbOptions6 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.tbOptions7 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
        $scope.datos={};
        $scope.detallesSolicitud={};
$scope.cargaDetallesSolicitud = function() {
// alert("hola"+MyService.data.datosSolicitud.titulo);
$scope.detallesSolicitud=MyService.data.datosSolicitud;
$scope.detallesSolicitud.fecha=$filter('date')(new Date($scope.detallesSolicitud.createdAt),'dd/MM/yyyy');
$scope.detallesSolicitud.dia=$filter('date')(new Date($scope.detallesSolicitud.createdAt),'yyyy');
// $scope.detallesSolicitud.fecha=Date.parse($scope.detallesSolicitud.createdAt);
 
 };

$scope.cargaDetallesSolicitud();
}]);
