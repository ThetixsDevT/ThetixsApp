
app.controller('SupportVCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster','$timeout',  function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster,$timeout) {
 
 if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}


 $scope.level=MyService.data.level;
  var dato="";
  var datosCuenta="";
  $scope.questions=[];
  $scope.supportTickets=[];
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

  $scope.loadSupportTickets= function(){
    $scope.supportTickets=[];
      $scope.questions=[];
    $http.get('https://www.thetixsapp.com:1350/supportTicket/?idVendor='+MyService.data.idUser).then(function (resp) {   
      $scope.supportTickets = resp.data.results;
        for (var i=0; i<$scope.supportTickets.length; i++) 
          {
            if ($scope.supportTickets[i].status!="terminated"){
               if (typeof($scope.supportTickets[i].idFather) == "undefined"){
                // alert("este es un padre");
                 $scope.questions.push($scope.supportTickets[i]);
              }
            };
          };
      $scope.supportDetail = null;
      $scope.lateral = true;
    });

  };
  $scope.check = function(item){
    var item = item;
    if (item.checked == "pending"){$scope.checkPending();};
    if (item.checked == "process"){$scope.checkInProcess();};
    if (item.checked == "completed"){$scope.checkCompleted();};
  };
  $scope.loadSupportTickets();

  $scope.checkInProcess = function(){
    $scope.supportTickets=[];
    $http.get('https://www.thetixsapp.com:1350/supportTicket/?idVendor='+MyService.data.idUser).then(function (resp) {   
      $scope.supportTicketsPre = resp.data.results;
      $scope.supportDetail = null;
      $scope.lateral = true;
       for (var i=0; i<$scope.supportTicketsPre.length; i++) 
        {
          if ($scope.supportTicketsPre[i].status=="process")
            {
              $scope.supportTickets.push($scope.supportTicketsPre[i]);
            }
        }
    });
  };
  // $scope.checkInProcess();
  $scope.checkPending = function(){
    $scope.supportTickets=[];
    $http.get('https://www.thetixsapp.com:1350/supportTicket/?idVendor='+MyService.data.idUser).then(function (resp) {   
      $scope.supportTicketsPre = resp.data.results;
      $scope.supportDetail = null;
      $scope.lateral = false;   
       for (var i=0; i<$scope.supportTicketsPre.length; i++) 
        {
          if ($scope.supportTicketsPre[i].status=="pending")
            {
              $scope.supportTickets.push($scope.supportTicketsPre[i]);
            }
        }
    });
  };
  // $scope.checkInProcess();
  $scope.checkCompleted = function(){
    $scope.supportTickets=[];
    $http.get('https://www.thetixsapp.com:1350/supportTicket/?idVendor='+MyService.data.idUser).then(function (resp) {   
      $scope.supportTicketsPre = resp.data.results;
      $scope.supportDetail = null;
      $scope.lateral = true;
       for (var i=0; i<$scope.supportTicketsPre.length; i++) 
        {
          if ($scope.supportTicketsPre[i].status=="completed")
            {
              $scope.supportTickets.push($scope.supportTicketsPre[i]);
            }
        }
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

  $scope.deleteSupportTicket = function(item){
    $http.delete('https://www.thetixsapp.com:1350/supportTicket/'+item.id , item)
    $scope.supportTickets.splice($scope.supportTickets.indexOf(item), 1);
  };

  $scope.supportDetail={};
  MyService.data.supportTicket={};

  $scope.checkMensage=function(item){
     $http.get('https://www.thetixsapp.com:1350/supportTicket/?idFather='+item.id).then(function (resp) {
      $scope.items = resp.data.results;
      $scope.items = $scope.items.reverse();
    });
  };
  $scope.checkMensageOnNew=function(){
    var idFather = MyService.data.idSupportTicket;
     $http.get('https://www.thetixsapp.com:1350/supportTicket/?idFather='+idFather).then(function (resp) {
      $scope.items = resp.data.results;
        $scope.items = $scope.items.reverse();
    });
  };
      $scope.openAnswer = function (item) {
      MyService.data.idFather=item.id;
      var modalInstance = $modal.open({
        templateUrl: 'modalAnswerV.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
              dato: function  () {
            return item;
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

    }, function () {
      setTimeout(function() {
            $scope.checkMensageOnNew();
         }, 2000);
    });
  };
  $scope.selectSupport = function(item){ 
    MyService.data.idSupportTicket=item.id;
    $scope.supportDetail=item;  
    identif=item.id;
    $scope.supportDetail.fecha=$filter('date')(new Date($scope.supportDetail.createdAt),'dd/MM/yyyy');
    $scope.supportDetail.dia=$filter('date')(new Date($scope.supportDetail.createdAt),'yyyy');
    MyService.data.supportTicket.descripctiom=item.descripctiom;
    angular.forEach($scope.supportTickets, function(item) {
      item.selected = false;
    });
    $scope.supportTicket = item;
    $scope.supportTicket.selected = true;
    $scope.filter = item.descripctiom;
    $scope.checkMensage(item);
  };
  
  // $scope.deleteItem = function(item){
  //   $http.delete('https://www.thetixsapp.com:1350/consultor/'+item.id , item)
  //   $scope.items.splice($scope.items.indexOf(item), 1);
  //   $scope.item = $filter('orderBy')($scope.items, 'nombres')[0];
  //   if($scope.item) $scope.item.selected = true;
  // };

  $scope.supportTicket = function(item){
    item.editing = false;
    var supportTicket= {};
    MyService.data.idenSupportTicket= item.id;
    // supportTicket.nombre=item.nombre;
    // supportTicket.idEstablecimiento=item.idEstablecimiento;
    supportTicket.idUser=item.idUser;
    supportTicket.idUserAct=MyService.data.idUser;
    item.id=null;
    supportTicket.selected=item.selected;
    supportTicket.editing=item.editing;
    if (MyService.data.idenSupportTicket){
      $http.put('https://www.thetixsapp.com:1350/supportTicket/'+MyService.data.idenSupportTicket, supportTicket)
    }
    else {
      $http.post('https://www.thetixsapp.com:1350/supportTicket/', supportTicket)
    }
    $scope.items = null;
    $scope.item = null;
    $scope.ingredientes = null;
   };

   
}]);
