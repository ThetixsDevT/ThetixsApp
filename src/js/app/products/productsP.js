app.controller('ProductsPCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster','$timeout', 'FileUploader', function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster,$timeout,FileUploader) {
  if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
 $scope.level=MyService.data.level;

$scope.item=null;


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





  var idUser = MyService.data.idUser;
  var dato="";
  var datosCuenta="";
  $scope.products=[];
  $scope.toaster = {
        
    type3: 'info',
    text3: 'Ok',
    title3: 'Info',
    
    type4: 'success',
    text4: 'Product agregado con exito',
    title4: 'Exito',
    
    type5: 'info',
    text5: 'Ok',
    title5: 'Info',
    
    type6: 'info',
    text6: 'Estado de preñéz registrado con exito',
    title6: 'Información',
    
    type7: 'warning',
    text7: 'El estado de preñez de este consultor se ha anulado',
    title7: 'Cuidado',

    type8: 'info',
    text8: 'category borrada con exito',
    title8: 'Información',

     typeOkEdit: 'info',
    textOkEdit: 'Ok',
    titleOkEdit: 'Info',
  };

  $scope.filter = '';
  $scope.mensajePrenez = 'Registrar / anular estado de preñéz del consultor';
    
  $scope.today = function() {
    $scope.reservationDate = new Date();
  };
 

  $scope.clear = function () {
    $scope.reservationDate = null;
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
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = 'shortDate';
    $scope.nacionalidades = ['V','E'];


$scope.readProductsAll=function(){
  $http.get('https://www.thetixsapp.com:1350/product/?idPartner='+idUser).then(function (resp) {
      $scope.items = resp.data.results;
      // alert("aqui");
    //    for (var i = 0; i < $scope.items.length; ++i) {
    //     if(typeof($scope.items[i].category) == "undefined"){
    //     $scope.items[i].category="ODONTOLOGÍA GENERAL";
    //   }
    // }      
    });
};


  $scope.carga = function (){
    $http.get('https://www.thetixsapp.com:1350/category/').then(function (resp) {
      $scope.categorys = resp.data.results;
      $scope.readProductsAll();
    });
    // $http.get('https://www.thetixsapp.com:1350/partner/?id').then(function (resp) {
    //   $scope.partners = resp.data.results;
    // });
  };
$scope.carga();

  $http.get('https://www.thetixsapp.com:1350/category/').then(function (resp) {
    $scope.categorys = resp.data.results;
  });

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.pop2 = function(){
    toaster.pop($scope.toaster.type3, $scope.toaster.title3, $scope.toaster.text3);
  };
  $scope.pop3 = function(){
    toaster.pop($scope.toaster.type4, $scope.toaster.title4, $scope.toaster.text4);
  };
  $scope.pop4 = function(){
    toaster.pop($scope.toaster.type5, $scope.toaster.title5, $scope.toaster.text5);
  };
  $scope.pop8 = function(){
    toaster.pop($scope.toaster.type8, $scope.toaster.title8, $scope.toaster.text8);
  };
   $scope.popOkEdit = function(){
    toaster.pop($scope.toaster.typeOkEdit, $scope.toaster.titleOkEdit, $scope.toaster.textOkEdit);
  };
    




 
  $scope.openConfirm = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm.html',
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
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openEditPrices = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalEditPricesP.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
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
        $scope.popOkEdit();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };


   $scope.openDoneDeleteProduct = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalDoneDeleteProduct.html',
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
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openConfirm2 = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm2.html',
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
       $scope.categorys.splice($scope.categorys.indexOf(item), 1);
        $scope.item = null;  
        // $scope.items = null;  
        $scope.pop8();
        
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

  $scope.createCategory = function(){
    var category = {name: 'Nueva category'};          
    category.name = $scope.checkItem(category, $scope.categorys, 'name');
    category.idUsuario = MyService.data.idUsuario;
    $scope.categorys.push(category);
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

  $scope.deleteCategory = function(item){
    $http.delete('https://www.thetixsapp.com:1350/category/'+item.id , item)
    $scope.categorys.splice($scope.categorys.indexOf(item), 1);
  };

  $scope.selectCategory = function(item){   
    MyService.data.category=item.name;
    angular.forEach($scope.categorys, function(item) {
      item.selected = false;
    });
    $scope.category = item;
    $scope.category.selected = true;
    $scope.filter = item.name;
    $http.get('https://www.thetixsapp.com:1350/product/?idPartner='+idUser).then(function (resp) {
      $scope.items = resp.data.results;
      // alert("aqui");
    //    for (var i = 0; i < $scope.items.length; ++i) {
    //     if(typeof($scope.items[i].category) == "undefined"){
    //     $scope.items[i].category="ODONTOLOGÍA GENERAL";
    //   }
    // }    
      $scope.item = null;  
    });
  };


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


  $scope.selectItem = function(item){    
    $scope.alerts=null;
    var identificador =item.id;
    var productName =item.productName;
    var description =item.description;
    $scope.itemsSchedules=item.itemsSchedules;
    $scope.weekOff=item.weekOff;
    MyService.data.productName = productName;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
      });

    $scope.item = item;
    $scope.item.selected = true;

    $http.get('https://www.thetixsapp.com:1350/product/?idPartner='+idUser).then(function (resp) {
      $scope.products = resp.data.results;
      });
     var pas = item.id;
    $scope.productFiltered = $scope.products.filter(function (product) {
      return (product.idproduct == pas );
      });
    setTimeout(function() {}, 500);
    
  };

  

  $scope.deleteItem = function(item){
    $http.delete('https://www.thetixsapp.com:1350/product/'+item.id , item)
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'productName')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.deleteProduct = function(product){
    $http.delete('https://www.thetixsapp.com:1350/product/'+product.id , product)
    $scope.productFiltered.splice($scope.products.indexOf(product), 1);
    $scope.product = $filter('orderBy')($scope.products, 'names')[0];
    if($scope.product) $scope.product.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      avatar:'img/avatar.png',
      mensajeNuevo:"Presione \"Editar\" para ingresar datos",
      idEstablecimiento: MyService.data.idEstablecimiento,
      level:2
    };
    
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
    $scope.item.category = MyService.data.category;
    $scope.item.mensajeNuevo=null;
    $scope.item.idUsuario = MyService.data.idUsuario;
    $http.get('https://www.thetixsapp.com:1350/category/').then(function (resp) {
    $scope.categorys = resp.data.results;
    }); 
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditingCategory = function(item){
    item.editing = false;
    var categoryAct= {};
    MyService.data.idenCategory= item.id;
    categoryAct.name=item.name;
    categoryAct.idEstablecimiento=item.idEstablecimiento;
    categoryAct.idUsuario=item.idUsuario;
    categoryAct.idUsuarioAct=MyService.data.idUsuario;
    item.id=null;
    categoryAct.selected=item.selected;
    categoryAct.editing=item.editing;
    if (MyService.data.idenCategory){ 
     $http.put('https://www.thetixsapp.com:1350/category/'+MyService.data.idenCategory, categoryAct)
    }
    else {
      $http.post('https://www.thetixsapp.com:1350/category/', categoryAct)
    }
  
    $scope.items = null;
    $scope.item = null;
    $scope.ingredientes = null;
 
  };

$scope.openViews = function(item){
  var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalViews.html',
        controller: 'ModalInstanceCtrl',
        size: 'md',
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
        // $scope.pop2();
        // $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
};
$scope.openInfo = function(item){
  var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalInfo.html',
        controller: 'ModalInstanceCtrl',
        size: 'md',
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
        // $scope.pop2();
        // $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
};

  $scope.doneEditingProduct = function(item){
    var productAct = {};
    MyService.data.idenProduct=item.id;
    
    productAct.images= $scope.images;
    productAct.productName=item.productName;
    productAct.description=item.description;
    productAct.description=item.description;
    productAct.category=item.category;
    productAct.companyName=item.companyName;
    productAct.capacityType=item.capacityType;
    productAct.capacity=item.capacity;
    productAct.duration=item.duration;
    productAct.itemsSchedules=item.itemsSchedules;
    productAct.reservationRequired=item.reservationRequired;
    productAct.schedules=item.schedules;
    productAct.weekOff=item.weekOff;
    productAct.reservationDate=item.reservationDate;
    productAct.notes=item.notes;
    productAct.status=item.status;
   


  
    productAct.status=item.status;



    if (MyService.data.idenProduct){
      $scope.pop4();
      $http.put('https://www.thetixsapp.com:1350/product/'+MyService.data.idenProduct , productAct)
    }
    else {
      $scope.pop3();;
      $http.post('https://www.thetixsapp.com:1350/product/', productAct)
    }
    $http.get('https://www.thetixsapp.com:1350/category/').then(function (resp) {
      $scope.categorys = resp.data.results;
    });
    $http.get('https://www.thetixsapp.com:1350/product/').then(function (resp) {
      $scope.app.states = resp.data.results;
    });
    // $scope.items = null;
    $scope.products = null;
    // $scope.item=null;
    item.editing = false;
  };

}]);
