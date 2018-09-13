app.controller('ProductsVCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster','$timeout', '$log', function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster,$timeout,$log) {
  if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
 $scope.level=MyService.data.level;
  // $scope.item.schedules=[];
  // $scope.item.schedules[0]="Unique";
  var idUser = MyService.data.idUser;
  var dato="";

   $scope.rate = 7;
    $scope.max = 5;
    $scope.isReadonly = false;
$scope.isArray = function(category){
  
  return category.isArray(textStuff[0][1]) };

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };  

  var datosCuenta="";
  $scope.productsFil=[];
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
      $http.get('https://www.thetixsapp.com:1350/product').then(function (resp) {
      $scope.productsFil = resp.data.results;
      });
    };
  $scope.carga = function (){
    $http.get('https://www.thetixsapp.com:1350/category/').then(function (resp) {
      $scope.categorys = resp.data.results;
    });
    $scope.readProductsAll();
    // $http.get('https://www.thetixsapp.com:1350/partner/?id').then(function (resp) {
    //   $scope.partners = resp.data.results;
    // });
  };
$scope.carga();

 


 $scope.isArray = angular.isArray;

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
  $scope.pop6 = function(){
    if ($scope.item.prenez == true){
      toaster.pop($scope.toaster.type6, $scope.toaster.title6, $scope.toaster.text6);
      }
    if ($scope.item.prenez == false){
      toaster.pop($scope.toaster.type7, $scope.toaster.title7, $scope.toaster.text7);
      }
  };    
  $scope.pop = function(){
    if ($scope.item.estado == true){
      toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    }
    if ($scope.item.estado == false){
      toaster.pop($scope.toaster.type2, $scope.toaster.title2, $scope.toaster.text2);
    }
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
    modalInstance.result.then(function () {
      // $scope.selected = selectedItem;
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
        templateUrl: 'modalEditPrices.html',
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
      // $scope.selected = selectedItem;
        $scope.item = null;  
        $scope.popOkEdit();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };


    $scope.openSetPrices = function (item) {
    
    var identificador=item.id;
    var productToSave = [];
    MyService.data.item=item;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSetPrices.html',
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
    modalInstance.result.then(function () {
      // $scope.selected = selectedItem;

        var uno= productToSave.total;
        productToSave.productName=MyService.data.product.productName;
        productToSave.total=MyService.data.product.total;
        $scope.app.total=$scope.app.total+productToSave.total;
        MyService.data.total=$scope.app.total;
        $scope.app.productsList.push(productToSave);
        MyService.data.productsList=$scope.app.productsList;
        $scope.app.products=$scope.app.products+1;
        MyService.data.products=$scope.app.products;

    }, function () {
      $log.info('Monto del producto agregado: ' );
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
      // $scope.selected = selectedItem;
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

    modalInstance.result.then(function () {
      // $scope.selected = selectedItem;
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
  }; $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

  $scope.deleteCategory = function(item){
    $http.delete('https://www.thetixsapp.com:1350/category/'+item.id , item)
    $scope.categorys.splice($scope.categorys.indexOf(item), 1);
  };

  $scope.selectCategory = function(item){  
  $scope.productsFil=[]; 
    MyService.data.category=item.name;
    angular.forEach($scope.categorys, function(item) {
      item.selected = false;
    });
    $scope.category = item;
    $scope.category.selected = true;
    $scope.filter = item.name;
    $http.get('https://www.thetixsapp.com:1350/product/').then(function (resp) {
      $scope.items = resp.data.results;
       
      $scope.item = null;
      if (item.name){
         for (var i=0; i<$scope.items.length; i++) 
          {
            // myArr.includes( 'donna' ) 
            // if ($scope.items[i].category[0] !== undefined && $scope.items[i].category.includes(item.name))
            if ($scope.items[i].category.includes(item.name))
                    // if ($scope.items[i].category==item.name)
            {
              $scope.items[i].rating="4";
           
              $scope.productsFil.push($scope.items[i]);
            };
          }   
        
      };
     
    });
  };



  $scope.selectItem = function(item){    
    $scope.alerts=null;
    var identificador =item.id;
    var productName =item.productName;
    var description =item.description;
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
    modalInstance.result.then(function () {
      // $scope.selected = selectedItem;
        $scope.item = null;  
        // $scope.pop2();
        // $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
};

$scope.openModalProductDetail = function(item){
  var identificador=item.id;
  var productToSave = {};
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalProductDetail.html',
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
      modalInstance.result.then(function () {
  
      var item = MyService.data.product;  
      var description="";
      var descriptionNew="";
      var label="";
       var quantity="";
      var total="";
      var price="";
      var commission="";
      var typeCommission="";

      MyService.data.product.tixInformation=[];
      if (MyService.data.cart=="yes"){  //activa el carro
        for (var i = 0; i < item.itemsPrices.length; ++i) {
           if (item.itemsPrices[i].quantity>0){
            label=item.itemsPrices[i].label;
          quantity=item.itemsPrices[i].quantity;
          total=item.itemsPrices[i].total;
          price=item.itemsPrices[i].price;
          if (item.itemsPrices[i].checked=='fixed'){
            typeCommission='f';
            commission=item.itemsPrices[i].commissionF;
          };
          if (item.itemsPrices[i].checked=='percentage'){
            typeCommission='p';
            commission=(item.itemsPrices[i].price*item.itemsPrices[i].commissionP/100);
          };

          descriptionNew=item.itemsPrices[i].description;
          descriptionNew={'line':descriptionNew,'label':label,'quantity':quantity,'amount':total, 'price':price, 'commission':commission, 'typeCommission':typeCommission};
          MyService.data.product.tixInformation.push(descriptionNew);
          item.itemsPrices[i].quantity=0;
        };
        }; 
      };

      var uno = productToSave.total;

    
      var numPosibilidades = 999999 - 99;
      var aleat = "";
      aleat = Math.random() * numPosibilidades;
      aleat = Math.round(aleat);
      aleat =  parseInt( aleat);

        productToSave.idPartner=MyService.data.product.idPartner;
        productToSave.idTix=aleat;
        // alert("idTixs: "+productToSave.idTix );
        productToSave.tixInformation=MyService.data.product.tixInformation;
        productToSave.productName=MyService.data.product.productName;
        productToSave.images=MyService.data.product.images;
        productToSave.notes=MyService.data.product.notes;
        productToSave.description=MyService.data.product.description;
        productToSave.total=MyService.data.product.total;
        var ind = 0;
        for (var i=0 ; i<MyService.data.product.length; i++){ //calcula el tamaño de itemsPrices
          ind = ind+1;
          };    

        MyService.data.allProducts.lengthItemsPrices=ind;
        
        $scope.app.total=$scope.app.total+productToSave.total; //calcula el monto total a pagar
        MyService.data.total=$scope.app.total; //hace global el monto total a pagar
        
        $scope.app.productsList.push(productToSave); //añade producto al carrito
        MyService.data.productsList=$scope.app.productsList;  //hace global la lista de productos
 
        $scope.app.products=$scope.app.products+1; //contador de productos en el carrito
        MyService.data.products=$scope.app.products;













        // $scope.pop2();
        // $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {

      // $log.info('Modal dismissed at: ' + new Date());
    });
};




  $scope.doneEditingProduct = function(item){
    var productAct = {};
    MyService.data.idenProduct=item.id;
    

    productAct.productName=item.productName;
    productAct.description=item.description;
    productAct.description=item.description;
    productAct.category=item.category;
    productAct.companyName=item.companyName;

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
