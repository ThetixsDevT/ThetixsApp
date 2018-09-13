app.controller('NewPartnerCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes',  '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state','FileUploader',
  function($scope, $filter, $http, editableOptions, editableThemes,$modal, MyService, filterFilter, datepickerConfig, toaster, $state,FileUploader){
 if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
$scope.partners=function () {
  $state.go('app.partners');
  // body...
}
$scope.partner=[];

    $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Miembro habilitado con exito',

    titleNP: '',
    typeNP: 'success',
    textNP: ''   
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
        url: 'js/controllers/upload2.php',
        formData: [{
          param1: $scope.prov.folder
          }]
    });
    uploader.filters.push({
        name: 'test',
        fn: function(item /*{File|FileLikeObject}*/, options) {
          // alert("nombre archivo: " +item.name);
          // MyService.data.nombreImagen=item.name;
          $scope.images.push("js/controllers/uploads/partners/"+$scope.prov.folder+"/"+item.name);
            return this.queue.length < 10;
        }
    });

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

    $scope.popOkNewPartner = function(){
        toaster.pop($scope.toaster.typeNP, $scope.toaster.titleNP, $scope.toaster.textMP);
    };
    $scope.passwordLength = 12;
    $scope.addUpper = true;
    $scope.addNumbers = true;
    $scope.addSymbols = false;

      $scope.createPassword = function(){
        var lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var numbers = ['0','1','2','3','4','5','6','7','8','9'];
        var symbols = ['!', '"', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
        var finalCharacters = lowerCharacters;
        if($scope.addUpper){
            finalCharacters = finalCharacters.concat(upperCharacters);
        }
        if($scope.addNumbers){
            finalCharacters = finalCharacters.concat(numbers);
        }
        if($scope.addSymbols){
            finalCharacters = finalCharacters.concat(symbols);
        }
        var passwordArray = [];
        for (var i = 1; i < $scope.passwordLength; i++) {
            passwordArray.push(finalCharacters[Math.floor(Math.random() * finalCharacters.length)]);
        };
        $scope.password = passwordArray.join("");
      // alert("PASS: "+$scope.password);
    };


    $scope.saveNewPartner=function (item) {
      var item = item;
      item.status="active";
      item.images= $scope.images;
      $scope.createPassword();
      item.password=$scope.password;
      item.level=2;
      $http.post('https://www.thetixsapp.com:1350/partner',item);
       // item.repName=item.repName;
      item.receiveremail=item.repEmail;
      item.text="thetixs platform informs you that the following partner credentials were created";
      var footer="Manager";
      var name="Felipe González";
      var receiveremail=MyService.data.adminAccount;
      $http({
        method:'POST',
        url:'libs/phpmailer/accountActivateNewPartner.php',
        data: 'name='+name +'&receiveremail='+receiveremail+'&email='+item.repEmail+'&footer='+footer+'&text='+item.text+'&password='+item.password+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        });
       // $http({
       //  method:'POST',
       //  url:'libs/phpmailer/accountActivate.php',
       //  data: 'name='+item.repName +'&receiveremail='+item.receiveremail+'&email='+item.repEmail+'&footer='+footer+'&text='+item.text+'&password='+item.password+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost,
       //  headers:{'Content-Type':'application/x-www-form-urlencoded'}
       //  });
      $scope.popOkNewPartner();
      setTimeout(function() {
         $state.go('app.welcome');
       }, 1000);
     
      // body...
    }

    // $scope.okPartner = function (item) {
    //   var item = item;
    //   var id = item.id;
    //   // item.password="l4mism4";
    //   $scope.createPassword();
    //   item.password=$scope.password;
    //   item.status="active";
    //   // item.repName=item.name;
     
    //   // $http.put('https://www.thetixsapp.com:1350/partner/'+id,item);
    //   // $modalInstance.close($scope.selected.item);
    //         $modalInstance.dismiss('cancel');
    // };







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
