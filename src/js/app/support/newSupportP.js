app.controller('NewProductPCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes',  '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state', 'FileUploader',
  function($scope, $filter, $http, editableOptions, editableThemes,$modal, MyService, filterFilter, datepickerConfig, toaster, $state, FileUploader){
 if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}

$scope.products=function () {
  $state.go('app.products');
  // body...
}

$scope.prov=[];
$scope.genAl=function(){
  var numPosibilidades = 9999999 - 99;
    var aleat = Math.random() * numPosibilidades;
    aleat = Math.round(aleat);
    aleat =  parseInt( aleat);
    $scope.prov.folder=aleat;
};
$scope.genAl();

$scope.images=[];
var uploader = $scope.uploader = new FileUploader({
        url: 'js/controllers/upload.php',
        formData: [{
          param1: $scope.prov.folder
          }]
    });

 uploader.filters.push({
        name: 'test',
        fn: function(item /*{File|FileLikeObject}*/, options) {
          // alert("nombre archivo: " +item.name);
          // MyService.data.nombreImagen=item.name;
          $scope.images.push("js/controllers/uploads/products/"+$scope.prov.folder+"/"+item.name);
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);

 $scope.loadCategorys = function (){
    $http.get('https://www.thetixsapp.com:1350/category/').then(function (resp) {
      $scope.categorys = resp.data.results;
      // alert(": "+$scope.categorys[0].name);
    });
  };
  $scope.loadCategorys();


  $scope.loadCompanys = function (){
    $http.get('https://www.thetixsapp.com:1350/partner/').then(function (resp) {
      $scope.companys = resp.data.results;
      // alert(": "+$scope.categorys[0].name);
    });
  };
  $scope.loadCompanys();

$scope.product=[];

    $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Miembro habilitado con exito',

    titleNP: 'Success',
    typeNP: 'success',
    textNP: 'OK'   
  };
      $scope.popOkNewProduct = function(){
        toaster.pop($scope.toaster.typeNP, $scope.toaster.titleNP, $scope.toaster.textNP);
    };



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





    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
   
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


     $scope.itemsPrice = [{price:"",commissionPHolder:"%"}];

 $scope.add = function () {
    $scope.itemsPrice.push({ 
      price: "",
      commissionP: 0,
      commissionF: 0,
      commissionPHolder:"%"
    });
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

       $scope.saveNewProduct=function (item) {
      var item = item;
      item.images= $scope.images;
      item.idPartner=MyService.data.idUser;
         item.itemsPrices=$scope.itemsPrice;
      item.status="pending";
      $http.post('https://www.thetixsapp.com:1350/product',item);
      $scope.popOkNewProduct();
      setTimeout(function() {
         $state.go('app.welcome');
       }, 1000);
     
      // body...
    };

}]);
