app.controller('PartnersCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes',  '$modal', 'MyService', 'filterFilter', '$log', 'datepickerConfig', 'toaster', '$state','MyService',
  function($scope, $filter, $http, editableOptions, editableThemes,$modal, MyService, filterFilter, $log, datepickerConfig, toaster, $state, MyService){
 if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
$scope.newPartner=function () {
  $state.go('app.newPartner');
  // body...
}

// $scope.items=[];
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

$scope.partners = [];
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
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
    $scope.getPartners = function () {
      $scope.news=false;
      $scope.partners=null;
      $http.get('https://www.thetixsapp.com:1350/partner').then(function (resp) {
      $scope.partners = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.partnersActive=[];
        $scope.partnersPending=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var result3 = [];
        var active = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.partners;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        var identif=0;
        if ($scope.partners && $scope.partners.length > 0){
          for (var i=0;i < $scope.partners.length;i++){
            var conversationDate1 =  $scope.partners[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
              identif=$scope.partners[i].id;  
            if (conversationDate ){
              if ( $scope.partners[i].status == "active"){
               
                result.push($scope.partners[i]);
                }
             if ( $scope.partners[i].status == "pending"){
              $scope.news=true;
              $scope.partners[i].accion=" <button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Validar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                                  
                result3.push($scope.partners[i]);
                }
            }
            $scope.partnersActive=result;
            $scope.partnersPending=result3;
          }
        }
        
        if ($scope.partnersActive){
        for (var i  = 0; i<$scope.partnersActive.length;i++){
          bandera = $scope.partnersActive[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.partnersActive[i].createdAtFormateada=bandera2;
          identif=$scope.partnersActive[i].id;           
  $scope.partnersActive[i].accion2="<button onclick=\"angular.element(this).scope().deletePartner('" +identif +"')\"  class=\"btn btn-danger btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-trash\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i><button onclick=\"angular.element(this).scope().viewPartner2('" +identif +"')\"  class=\"btn btn-info btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-eye\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i><button onclick=\"angular.element(this).scope().sendCredentials('" +identif +"')\"  class=\"btn btn-success btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-bolt\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>" ;                                       
          }
        }
        if ($scope.partnersPending){
        for (var i  = 0; i<$scope.partnersPending.length;i++){
          bandera = $scope.partnersPending[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.partnersPending[i].createdAtFormateada=bandera2;
          identif=$scope.partnersPending[i].id; 
          // $scope.partnersPending[i].accion="<button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Validar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          $scope.partnersPending[i].accion2="<button onclick=\"angular.element(this).scope().deletePartner('" +identif +"')\"  class=\"btn btn-danger btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-trash\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i><button onclick=\"angular.element(this).scope().viewPartner('" +identif +"')\"  class=\"btn btn-info btn-xs btn-rounded\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-eye\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>" ;                        
          }
        }
        $scope.partnersActive=$scope.partnersActive.reverse();
      
        $scope.tbOptionsNew.aaData = $scope.partnersPending;
        $scope.tbOptionsNew.aoColumns=[
          { mData: 'createdAtFormateada'},
          {mData:'companyName'},
          {mData:'address'},
           // {mData:'repName'},
          { mData: 'phone'},
          { mData: 'repEmail'},
          { mData: 'status'},
          // { mData: 'accion' },
          { mData: 'accion2' }   
          ];

          $scope.tbOptionsActive.data = $scope.partnersActive;
          $scope.tbOptionsActive.aaData = $scope.partnersActive;
          $scope.tbOptionsActive.aoColumns=[
            { mData:'createdAtFormateada'},
             {mData:'companyName'},
          {mData:'address'},
          { mData: 'phone'},
          { mData: 'repEmail'},
          { mData: 'password'},
          // { mData: 'accion' },
          { mData: 'accion2' }  
            ];
        
    });

    };
    $scope.getPartners();

      $scope.deletePartner =function(item){
      var identificador = item;
      $http.get('https://www.thetixsapp.com:1350/partner/'+identificador).success(function(respuesta){        
        $scope.item=respuesta; 
        $scope.items = [];
        var dato=[];
        var item=[];
        var datosCuenta="";
        var modalInstance = $modal.open({
          templateUrl: 'modalDeletePartner.html',
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
          // $scope.selected = selectedItem;
          $scope.partners=[];
            setTimeout(function() { $scope.getPartners();$state.go('app.welcome');}, 2000);
        }, function () {
          $scope.getPartners();
          $log.info('PartnerSeen dismissed at: ' + new Date());
          $state.go('app.welcome');

        });
      }) 
    };



   
    $scope.viewPartner =function(item){
      var identificador = item;
      $http.get('https://www.thetixsapp.com:1350/partner/'+identificador).success(function(respuesta){        
        $scope.item=respuesta; 
        $scope.items = [];
        var dato=[];
        var item=[];
        var datosCuenta="";
        var modalInstance = $modal.open({
          templateUrl: 'modalViewPartner.html',
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
          // $scope.selected = selectedItem;
               $scope.partners=[];
            setTimeout(function() { $scope.getPartners();}, 2000);
          $scope.getPartners();
        }, function () {
          $scope.getPartners();
          $log.info('PartnerSeen dismissed at: ' + new Date());
          $state.go('app.welcome');
        });
      }) 
    };



   
    $scope.sendCredentials =function(item){
      var identificador = item;
      $http.get('https://www.thetixsapp.com:1350/partner/'+identificador).success(function(respuesta){        
        $scope.item=respuesta; 
        $scope.items = [];
        var dato=[];
        var item=[];
        var datosCuenta="";
        var modalInstance = $modal.open({
          templateUrl: 'modalSuccessCredentials.html',
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
          // $scope.selected = selectedItem;
          $scope.partners=[];
            setTimeout(function() { $scope.getPartners();$state.go('app.welcome');}, 2000);
        }, function () {
          $scope.getPartners();
          $log.info('PartnerSeen dismissed at: ' + new Date());
          $state.go('app.welcome');

        });
      }) 
    };



    $scope.viewPartner2 =function(item){
      var identificador = item;
      $http.get('https://www.thetixsapp.com:1350/partner/'+identificador).success(function(respuesta){        
        $scope.item=respuesta; 
        $scope.items = [];
        var dato=[];
        var item=[];
        var datosCuenta="";
        var modalInstance = $modal.open({
          templateUrl: 'modalViewPartner2.html',
          controller: 'ModalInstanceCtrl',
          size: 'lg',
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
               $scope.partners=[];
            setTimeout(function() { $scope.getPartners();}, 2000);
          // $scope.selected = selectedItem;
        }, function () {
          $scope.getPartners();
          $log.info('PartnerSeen dismissed at: ' + new Date());
            // $state.go('app.welcome');
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
