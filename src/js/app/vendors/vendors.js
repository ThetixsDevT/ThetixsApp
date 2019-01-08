app.controller('VendorsCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes',  '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state', '$log',
  function($scope, $filter, $http, editableOptions, editableThemes,$modal, MyService, filterFilter, datepickerConfig, toaster, $state, $log){
 if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
$scope.newVendor=function () {
  $state.go('app.newVendor');
  // body...
}

     $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Miembro habilitado con exito',

    title2: 'Exito',
    type2: 'success',
    text2: 'Miembro borrado con exito'   
  };
      $scope.pop = function(){
        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    };

$scope.vendors = [];
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
    $scope.tbOptionsNew = {
    filterText: ''};
    $scope.filter = '';
      $scope.tbOptionsNew = {
      bDestroy: true,
      pageLength: 150,
      data: []
                                                     
    };
   
      $scope.tbOptionsActive = {
      bDestroy: true,
      pageLength: 150,
      data: []
                                                     
    };

    //   $scope.tbOptionsAsistentes = {
    //   bDestroy: true,
    //   pageLength: 150,
    //   data: []
                                                     
    // };




    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.getVendors = function () {
      $scope.news=false;
      $scope.vendors=null;
      $http.get('https://www.thetixsapp.com:1350/vendor').then(function (resp) {
      $scope.vendors = resp.data.results;

        var bandera="";
        var bandera2="";
        $scope.vendorsActive=[];
        $scope.vendorsPending=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var result3 = [];
        var active = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.vendors;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        var identif=0;
        if ($scope.vendors && $scope.vendors.length > 0){
          for (var i=0;i < $scope.vendors.length;i++){
            if ($scope.vendors[i].name&&$scope.vendors[i].lastName)
            {
            
              $scope.vendors[i].fullname=$scope.vendors[i].name+" "+$scope.vendors[i].lastName;
            };
            if ($scope.vendors[i].name&& !$scope.vendors[i].lastName)
            {
            
              $scope.vendors[i].fullname=$scope.vendors[i].name;
            };
            var conversationDate1 =  $scope.vendors[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
              identif=$scope.vendors[i].id;  
            if (conversationDate ){
              if ( $scope.vendors[i].status == "active"){
               
                result.push($scope.vendors[i]);
                }
             if ( $scope.vendors[i].status == "pending"){
               $scope.news=true;
              $scope.vendors[i].accion=" <button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Validar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                                  
                result3.push($scope.vendors[i]);
                }
            }
            $scope.vendorsActive=result;
            $scope.vendorsPending=result3;
          }
        }
        
        if ($scope.vendorsActive){
        for (var i  = 0; i<$scope.vendorsActive.length;i++){
          bandera = $scope.vendorsActive[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.vendorsActive[i].createdAtFormateada=bandera2;
          identif=$scope.vendorsActive[i].id;           
          $scope.vendorsActive[i].country=$scope.vendorsActive[i].country.name;
          $scope.vendorsActive[i].accion2="<button onclick=\"angular.element(this).scope().deleteVendor('" +identif +"')\"  class=\"btn btn-danger btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-trash\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i><button onclick=\"angular.element(this).scope().viewVendor2('" +identif +"')\"  class=\"btn btn-info btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-eye\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i><button onclick=\"angular.element(this).scope().sendCredentials('" +identif +"')\"  class=\"btn btn-success btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-bolt\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>" ;                        

          // $scope.vendorsActive[i].accion2="<button onclick=\"angular.element(this).scope().deleteVendor('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-trash\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i><button onclick=\"angular.element(this).scope().viewVendor('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }
        if ($scope.vendorsPending){
        for (var i  = 0; i<$scope.vendorsPending.length;i++){
          bandera = $scope.vendorsPending[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.vendorsPending[i].createdAtFormateada=bandera2;
          identif=$scope.vendorsPending[i].id; 
          // $scope.vendorsPending[i].accion="<button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Validar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          $scope.vendorsPending[i].accion2="<button onclick=\"angular.element(this).scope().deleteVendor('" +identif +"')\"  class=\"btn btn-danger btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-trash\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i><button onclick=\"angular.element(this).scope().viewVendor('" +identif +"')\"  class=\"btn btn-info btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-eye\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>" ;                        
           $scope.vendorsPending[i].country=$scope.vendorsPending[i].country.name;
          }
        } 
        $scope.vendorsActive=$scope.vendorsActive.reverse();
      
        
          // if ($scope.vendorsPending.length>1){
        $scope.tbOptionsNew.aaData = $scope.vendorsPending;
        $scope.tbOptionsNew.aoColumns=[
          { mData: 'createdAtFormateada'},
          {mData:'fullname'},
          { mData: 'phone'},
          { mData: 'city'},
          { mData: 'country'},
          { mData: 'email'},
          // { mData: 'accion' },
          { mData: 'accion2' }   
          ];
        // };
          
          // if ($scope.vendorsActive.length>1){
          $scope.tbOptionsActive.data = $scope.vendorsActive;
          $scope.tbOptionsActive.aaData = $scope.vendorsActive;
          $scope.tbOptionsActive.aoColumns=[
          { mData: 'createdAtFormateada'},
          {mData:'fullname'},
          { mData: 'phone'},
          { mData: 'password'},
          { mData: 'country'},
          { mData: 'email'},
          // { mData: 'accion' },
          { mData: 'accion2' }  
            ];
        // };
    });

    };
    $scope.getVendors();
 $scope.deleteVendor =function(item){
      var identificador = item;
      $http.get('https://www.thetixsapp.com:1350/vendor/'+identificador).success(function(respuesta){        
        $scope.item=respuesta; 
        $scope.items = [];
        var dato=[];
        var item=[];
        var datosCuenta="";
        var modalInstance = $modal.open({
          templateUrl: 'modalDeleteVendor.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          resolve: {
              dato: function  () {
                return $scope.item;
              // body...vendedor
              },
              items: function () {
                return $scope.items;
              }
            }
          });
        modalInstance.result.then(function () {
        
              $scope.vendors=[];
            setTimeout(function() { $scope.getVendors();$state.go('app.welcome');}, 2000);
            // alert("si"+$scope.lup);

        }, function () {
          $scope.getVendors();
          $log.info('PartnerSeen dismissed at: ' + new Date());
          $state.go('app.welcome');

        });
      }) 
    };
    $scope.viewVendor =function(item){
      var identificador = item;
      $http.get('https://www.thetixsapp.com:1350/vendor/'+identificador).success(function(respuesta){        
        $scope.item=respuesta; 

        if ($scope.item.name&&$scope.item.lastName){
                  $scope.item.fullName=$scope.item.name+" "+$scope.item.lastName;
        };
                if ($scope.item.name&&!$scope.item.lastName){
                  $scope.item.fullName=$scope.item.name;
        };


        $scope.item.companyAddress=$scope.item.city+" "+$scope.item.country.name;  
        // $scope.items = ['Item 1', 'Item 2', 'Item 3'];
        var dato=[];
        var item=[];
        var datosCuenta="";
               $scope.items = [];
        var modalInstance = $modal.open({
          templateUrl: 'modalViewVendor.html',
          controller: 'ModalInstanceCtrl',
          size: 'md',
          resolve: {
              dato: function  () {
                return $scope.item;
              // body...vendedor
              },
            
              items: function () {
                return $scope.items;
              }
            }
          });
        modalInstance.result.then(function (lup) {
          $scope.lup=lup;
            if (typeof($scope.lup) != "undefined" && $scope.lup==1){
              $scope.vendors=[];
            setTimeout(function() { $scope.getVendors();}, 2000);
            // alert("si"+$scope.lup);
          };
        }, function () {
        
            $scope.getVendors();

          $log.info('VendorView dismissed at: ' + new Date());
        });
      }) 
    };


      $scope.viewVendor2 =function(item){
      var identificador = item;
      $http.get('https://www.thetixsapp.com:1350/vendor/'+identificador).success(function(respuesta){        
        $scope.item=respuesta; 

        if ($scope.item.name&&$scope.item.lastName){
                  $scope.item.fullName=$scope.item.name+" "+$scope.item.lastName;
        };
                if ($scope.item.name&&!$scope.item.lastName){
                  $scope.item.fullName=$scope.item.name;
        };


        $scope.item.companyAddress=$scope.item.city+" "+$scope.item.country.name;  
        // $scope.items = ['Item 1', 'Item 2', 'Item 3'];
        var dato=[];
        var item=[];
        var datosCuenta="";
               $scope.items = [];
        var modalInstance = $modal.open({
          templateUrl: 'modalViewVendor2.html',
          controller: 'ModalInstanceCtrl',
          size: 'md',
          resolve: {
              dato: function  () {
                return $scope.item;
              // body...vendedor
              },
            
              items: function () {
                return $scope.items;
              }
            }
          });
        modalInstance.result.then(function () {
        
         $scope.vendors=[];
            setTimeout(function() { $scope.getVendors();}, 2000);
         
        }, function () {
        
$scope.getVendors();

          $log.info('VendorView dismissed at: ' + new Date());
        });
      }) 
    };




  $scope.sendCredentials =function(item){
      var identificador = item;
      $http.get('https://www.thetixsapp.com:1350/vendor/'+identificador).success(function(respuesta){        
        $scope.item=respuesta; 
        $scope.items = [];
        var dato=[];
        var item=[];
        var datosCuenta="";
        var modalInstance = $modal.open({
          templateUrl: 'modalSuccessCredentialsA.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          resolve: {
              dato: function  () {
                return $scope.item;
              // body...vendedor
              },
              items: function () {
                return $scope.items;
              }
            }
          });
        modalInstance.result.then(function () {
        
              $scope.vendors=[];
            setTimeout(function() { $scope.getVendors();$state.go('app.welcome');}, 2000);
            // alert("si"+$scope.lup);

        }, function () {
          $scope.getVendors();
          $log.info('VendorSeen dismissed at: ' + new Date());
          $state.go('app.welcome');

        });
      }) 
    };





    $scope.html5 = {
      email: 'email@example.com',
      tel: '123-45-67',
      number: 29,
      range: 10,
      url: 'http://example.com',
      search: 'blabla',
      color: '#6a4415',
      date: null,
      time: '12:30',
      datetime: null,
      month: null,
      week: null
    };

    $scope.user = {
    	name: 'awesome',
    	desc: 'Awesome user \ndescription!',
      status: 2,
      agenda: 1,
      remember: false
    }; 

    $scope.statuses = [
      {value: 1, text: 'status1'},
      {value: 2, text: 'status2'},
      {value: 3, text: 'status3'}
    ];

    $scope.agenda = [
      {value: 1, text: 'male'},
      {value: 2, text: 'female'}
    ];

    $scope.showStatus = function() {
      var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
      return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.showAgenda = function() {
      var selected = $filter('filter')($scope.agenda, {value: $scope.user.agenda});
      return ($scope.user.agenda && selected.length) ? selected[0].text : 'Not set';
    };

    // editable table
    $scope.users = [
      {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
      {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
      {id: 3, name: 'awesome user3', status: 2, group: null}
    ];

    $scope.groups = [];
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };

    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.groupName || 'Not set';
      }
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user && user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.checkName = function(data, id) {
      if (id === 2 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('api/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null 
      };
      $scope.users.push($scope.inserted);
    };

}]);
