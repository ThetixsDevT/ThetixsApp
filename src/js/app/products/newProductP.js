app.controller('NewProductPCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes',  '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state', 'FileUploader',
  function($scope, $filter, $http,  editableOptions, editableThemes,$modal, MyService, filterFilter, datepickerConfig, toaster, $state, FileUploader){
 if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
$scope.products=function () {
  $state.go('apps.productsP');
  // body...
}
$scope.time = {
      twelve: new Date('2015-01-01'),
      twentyfour: new Date()
    };
$scope.activeBooking=function(){
  $('html,body').animate({
    scrollTop: $("#booking").offset().top
}, 500);
};
$scope.duration = new Date('2015-01-01 00:00:00');

    $scope.hstep2 = 1;
    $scope.mstep2 = 15;

    $scope.options2    = {
      hstep2: [1, 2, 3],
      mstep2: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };
 // $scope.itemsPrice = [{price:"",commissionPHolder:"%",currency:"$ USD",availability:"0"}];
$scope.itemSchedules=[{description:"Unique"}];
  // $scope.itemSchedules.[0]="Unique";
 $scope.today = moment();

    $scope.myMonth = moment().add(3, 'MONTH');

    $scope.highlightDays = [
        {date: moment().date(2), css: 'holiday', selectable: false, title: 'Holiday time !'},
        {date: moment().date(14), css: 'off', selectable: false, title: 'We don\'t work today'},
        {
            date: moment().date(25),
            css: 'birthday',
            selectable: true,
            title: 'I\'m thir... i\'m 28, seriously, I mean ...'
        }
    ];

    $scope.selectedDays2 = [moment().date(4), moment().date(5), moment().date(8)];
    $scope.selectedDays3 = [];
    // $scope.weekend=[];
// $scope.item=[];
$scope.weekOff=[];
// $scope.item.push=({item.mo="false",item.tu="false",item.we="false",item.th="false",item.fr="false",item.sa="false",item.su="false"});

$scope.selectDay=function(item){
 if (item.mo==true){
  // $scope.item.mo=false;
  $scope.weekOff[0]=1;};
 if (item.tu==true){
  // $scope.item.tu=false;
  $scope.weekOff[1]=2;};
 if (item.we==true){
  // $scope.item.we=false;
  $scope.weekOff[2]=3;};
 if (item.th==true){
  // $scope.item.th=false;
  $scope.weekOff[3]=4;};
 if (item.fr==true){
  // $scope.item.fr=false;
  $scope.weekOff[4]=5;};
 if (item.sa==true){
  // $scope.item.sa=false;
  $scope.weekOff[5]=6};
 if (item.su==true){
  // $scope.item.su=false;
  $scope.weekOff[6]=0};

  if (item.mo==false){
  // $scope.item.mo=false;
  $scope.weekOff[0]=8;};
 if (item.tu==false){
  // $scope.item.tu=false;
  $scope.weekOff[1]=8;};
 if (item.we==false){
  // $scope.item.we=false;
  $scope.weekOff[2]=8;};
 if (item.th==false){
  // $scope.item.th=false;
  $scope.weekOff[3]=8;};
 if (item.fr==false){
  // $scope.item.fr=false;
  $scope.weekOff[4]=8;};
 if (item.sa==false){
  // $scope.item.sa=false;
  $scope.weekOff[5]=8};
 if (item.su==false){
  // $scope.item.su=false;
  $scope.weekOff[6]=8};




};


    $scope.daysAllowed = [moment().date(4), moment().date(5), moment().date(8)];

    // $scope.myArrayOfDates = [moment().date(4), moment().date(5), moment().date(8)];



    $scope.myArrayOfDates = [];

    $scope.$watch('myArrayOfDates', function (newValue) {
        if (newValue) {
            console.log('my array changed, new size : ' + newValue.length);
        }
    }, true);

    $scope.logMonthChanged = function (newMonth, oldMonth) {
        alert('new month : ' + newMonth.format('YYYY-MM-DD') + ' || old month : ' + oldMonth.format('YYYY-MM-DD'));
    };

    $scope.oneDaySelectionOnly = function () {
        $scope.selectedDays3.length = 0;
    };

    $scope.changeMomentLocale = function (locale) {
        moment.locale(locale);
    };

    $scope.rightClickCb = function(event, day){
        alert('right clicked on ' + day.date.format('YYYY-MM-DD'));
    };

    $scope.disable6MonthsFromNow = function(event, month){
        if(month.isBefore(moment().subtract(6, 'month'), 'month') || month.isAfter(moment().add(6, 'month'), 'month')){
            event.preventDefault();
        }
    };

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


     $scope.itemsPrice = [{price:"",commissionPHolder:"%",currency:"$ USD",availability:"0"}];

 $scope.add = function () {
    $scope.itemsPrice.push({ 
      price: "",
      commissionP: 0,
      commissionF: 0,
      commissionPHolder:"%",
      currency:"$ USD"
    });
  };

 

  $scope.addSchedule = function () {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var item = "";
      var modalInstance = $modal.open({
        templateUrl: 'modalAddSchedule.html',
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
    modalInstance.result.then(function () {
      

      // $scope.selected = selectedItem;
        // $scope.item = null;  
        // $scope.pop2();
        // $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      var inyector = MyService.data.newSchedule;
      $scope.itemSchedules.push(inyector);
      // $log.info('Modal dismissed at: ' + new Date());
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
    $scope.openOfDates=function(item){
      item.ofDates=true;
    };

       $scope.saveNewProduct=function (item) {
      var item = item;
      item.images= $scope.images;
      item.unavailability=$scope.selectedDays3;
      item.idPartner=MyService.data.idUser;
      item.duration=$scope.duration;
      item.itemsPrices=$scope.itemsPrice;
      item.itemsSchedules=$scope.itemSchedules;
      item.weekOff=$scope.weekOff;
      item.status="pending";
      $http.post('https://www.thetixsapp.com:1350/product',item);
      $scope.popOkNewProduct();
      setTimeout(function() {
         $state.go('app.welcome');
       }, 1000);
     
      // body...
    };

}]);
