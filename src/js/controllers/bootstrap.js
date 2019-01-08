'use strict';

/* Controllers */

  // bootstrap controller
  app.controller('AccordionDemoCtrl', ['$scope','MyService', function($scope,MyService) {
       if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
    $scope.oneAtATime = true;

    $scope.groups = [
      {
        title: 'Accordion group header - #1',
        content: 'Dynamic group body - #1'
      },
      {
        title: 'Accordion group header - #2',
        content: 'Dynamic group body - #2'
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];


   

    $scope.addItem = function() {
      var newItemNo = $scope.items.lemanagerAccountHostngth + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }])
  ; 
  app.controller('AlertDemoCtrl', ['$scope', function($scope) {
    $scope.alerts = [

      // { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
      { type: 'info', msg: 'For a correct operation of the platform we invite you to complete the information of your profile',link:'#app.page.profile' }
      // { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
  ; 
  app.controller('ButtonsDemoCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };
  }])
  ; 
  app.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'img/c' + slides.length + '.jpg',
        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])
  ; 
  app.controller('DropdownDemoCtrl', ['$scope', function($scope) {
    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      //console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  }])
  ; 
  app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', 'dato', 'MyService', '$http',function($scope, $modalInstance, items, dato,MyService, $http) {
    $scope.items = items;
    $scope.item=dato;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };

    $scope.typesCommission = [
       {
        text: 'percentage',
        value: 'percentage'
      },
      {
        text: 'fixed',
        value: 'fixed'
      }

    ];
 
  $scope.okSuccessCredentials = function (item) {
      var item = item;
      var id = item.id;
      // item.password="l4mism4";
      // $scope.createPassword();
      // item.password=$scope.password;
      item.status="active";
      // item.repName=item.name;
      item.repEmail=item.email;
      item.receiveremail=item.repEmail;
      item.text="to Thetixs network. Here is all you need to get started!";
      var footer="Manager";
      $http({
        method:'POST',
        url:'libs/phpmailer/accountActivate.php',
        data: 'name='+item.repName +'&receiveremail='+item.receiveremail+'&email='+item.receiveremail+'&footer='+footer+'&text='+item.text+'&password='+item.password+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        });
      // $modalInstance.close($scope.selected.item);
            $modalInstance.dismiss('cancel');
    };

    $scope.okSuccessCredentialsA = function (item) {
      var item = item;
      var id = item.id;
      // item.password="l4mism4";
      // $scope.createPassword();
      // item.password=$scope.password;
      item.status="active";
      // item.repName=item.name;
      item.repEmail=item.email;
      item.receiveremail=item.repEmail;
      item.text="to Thetixs network. Here is all you need to get started!";
      var footer="Manager";
      $http({
        method:'POST',
        url:'libs/phpmailer/accountActivate.php',
        data: 'name='+item.name +'&receiveremail='+item.receiveremail+'&email='+item.receiveremail+'&footer='+footer+'&text='+item.text+'&password='+item.password+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        });
      // $modalInstance.close($scope.selected.item);
            $modalInstance.dismiss('cancel');
    };




    $scope.calculator=function(item){
      var item=item;
      item.total=0;
      for (var i =0; i < item.itemsPrices.length;i++){
        if (item.itemsPrices[i].checked=="fixed"){
        item.prev=item.itemsPrices[i].quantity*item.itemsPrices[i].price;
        item.amountCommision=item.itemsPrices[i].quantity*item.itemsPrices[i].commissionF;
        }
        if (item.itemsPrices[i].checked=="percentage"){
        item.prev=item.itemsPrices[i].quantity*item.itemsPrices[i].price;
        item.amountCommision=item.itemsPrices[i].quantity*(item.itemsPrices[i].price*item.itemsPrices[i].commissionP/100);
        }
        if (item.prev>0){
          item.total=item.total+item.prev;
          $scope.item.total=item.total;
        };
        

        // $scope.item.total=item.total;
      };

    };


    $scope.addToCart=function(item){

      $modalInstance.close();

      MyService.data.cart="yes";      
    };

     $scope.addItemPrice = function () {
        $scope.item.itemsPrices.push({ 
          price: "",
          commissionP: 0,
          commissionF: 0,
          commissionPHolder:"%"
        });
      };
      $scope.add=function(product){
          MyService.data.cart="yes";
            var product = product;
        for (var i = 0;i<product.itemsPrices.length;i++){
          product.itemsPrices[i].description=product.itemsPrices[i].quantity+" "+product.itemsPrices[i].label+" x $ "+product.itemsPrices[i].price+ " = $ " +(product.itemsPrices[i].quantity*product.itemsPrices[i].price);
        
        };
        MyService.data.product=product;
        $scope.item=null;
        product = null;
        $modalInstance.close();
         
      };

    $scope.saveChanges = function (item) {
        var item = item;
        var identif= item.id; 
        $http.put('https://www.thetixsapp.com:1350/product/'+identif, item);
        $modalInstance.close();
      };

    $scope.removePrice = function(index,item) {
      var index = index;


      $scope.item.itemsPrices.splice(index, 1);
      $scope.calculator(item);
    };

     $scope.okDoneDeleteProduct = function (item) { 
      var idProduct=MyService.data.identificador;
      $http.delete('https://www.thetixsapp.com:1350/product/'+idProduct , item)
      $scope.items = null;
      $scope.item = null; 
      $modalInstance.close();
    };



    $scope.okDoneDeletePartner = function (item) { 
      var idPartner=item.id;
      $http.delete('https://www.thetixsapp.com:1350/partner/'+idPartner , item)
      $scope.items = null;
      $scope.item = null; 
      $modalInstance.close();
    };

    $scope.okDoneDeleteVendor = function (item) { 
      var idVendor=item.id;
      $http.delete('https://www.thetixsapp.com:1350/vendor/'+idVendor , item)
      $scope.items = null;
      $scope.item = null; 
      $modalInstance.close();
    };

    $scope.deleteCategory=function(iden){
      var iden = iden;
       $http.delete('https://www.thetixsapp.com:1350/category/'+iden)
      $scope.items.splice($scope.items.indexOf(iden), 1);
      $scope.asign();
      $modalInstance.close($scope.selected.item);
    };
       var identif = "";
          $scope.tbOptionsCategoryListing = {
          bDestroy: true,
          pageLength: 150,
          data: []                                                
        };
       if ($scope.items){
           for (var i  = 0; i<$scope.items.length;i++){
          identif=$scope.items[i].id; 
          $scope.items[i].options="<button onclick=\"angular.element(this).scope().deleteCategory('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\"><i class=\"fa fa-trash\"></i></span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>" ;                        
          }
       };

    $scope.asign = function(){
        $scope.tbOptionsCategoryListing.aaData = $scope.items;
        $scope.tbOptionsCategoryListing.aoColumns=[
          { mData:'name'},
          { mData: 'options'}   
        ];
    };   

    $scope.asign();


  
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




    $scope.okAddSchedule = function (item){
      var item = item;
      MyService.data.newSchedule = item;
       $modalInstance.dismiss('cancel');
    };


    $scope.okPartner = function (item) {
      var item = item;
      var id = item.id;
      // item.password="l4mism4";
      $scope.createPassword();
      item.password=$scope.password;
      item.status="active";
      // item.repName=item.name;
      item.repEmail=item.email;
      item.receiveremail=item.repEmail;
      item.text="to Thetixs network. Here is all you need to get started!";
      var footer="Manager";
      $http({
        method:'POST',
        url:'libs/phpmailer/accountActivate.php',
        data: 'name='+item.repName +'&receiveremail='+item.receiveremail+'&email='+item.receiveremail+'&footer='+footer+'&text='+item.text+'&password='+item.password+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        });
      $http.put('https://www.thetixsapp.com:1350/partner/'+id,item);
      // $modalInstance.close($scope.selected.item);
            $modalInstance.dismiss('cancel');
    };

    
     $scope.okAddCategory = function (item) {
      var item = item;
      $http.post('https://www.thetixsapp.com:1350/category/',item);
      $modalInstance.close($scope.selected.item);
    };
    $scope.okVendor = function (item) {
      var item = item;
      var id = item.id;
      $scope.createPassword();
       item.password=$scope.password;
      item.status="active";
      item.receiveremail=item.email;
      item.text="to Thetixs network. Here is all you need to get started!";
      var footer="Manager";
      var emailSender=MyService.data.emailSender;
      $http({
        method:'POST',
        url:'libs/phpmailer/accountActivate.php',
        data: 'name='+item.fullName +'&receiveremail='+item.receiveremail+'&email='+item.email+'&footer='+footer+'&text='+item.text+'&password='+item.password+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        });
      // alert('email sender: '+emailSender);
      $http.put('https://www.thetixsapp.com:1350/vendor/'+id,item);
      var lup = 1;
      $modalInstance.close(lup);
    };





    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
     $scope.sendMensage = function (item) {
      var item = item;
      var mensage = {};
      mensage.idPartner=item.idPartner;
      mensage.product=item;
      mensage.idVendor=MyService.data.idUser;
      mensage.description=item.descriptionMensage;
      mensage.status="pending";
      mensage.autor="vendor";
      $http.post('https://www.thetixsapp.com:1350/supportTicket/',mensage);
      $modalInstance.dismiss('cancel');
       // $log.info('Product detail dismissed at: ' + new Date());
    };

      $scope.okAnswer = function (item) {
      var item = item;
      var mensage = {};
      mensage.idPartner=MyService.data.idUser;
      mensage.idVendor=item.idVendor;
      mensage.idFather=MyService.data.idFather;
      mensage.description=item.text;
      mensage.status="process";
      mensage.autor="partner";
      $http.post('https://www.thetixsapp.com:1350/supportTicket/',mensage);
      $modalInstance.dismiss('cancel');
       // $log.info('Product detail dismissed at: ' + new Date());
    };$scope.okAnswerV = function (item) {
      var item = item;
      var mensage = {};
      // mensage.idPartner=MyService.data.idUser;
      mensage.idVendor=MyService.data.idUser;
      mensage.idFather=MyService.data.idFather;
      mensage.description=item.text;
      mensage.status="process";
      mensage.autor="vendor";
      $http.post('https://www.thetixsapp.com:1350/supportTicket/',mensage);
      $modalInstance.dismiss('cancel');
       // $log.info('Product detail dismissed at: ' + new Date());
    };

    $scope.okAnswerA = function (item) {
      var item = item;
      var mensage = {};
      // mensage.idPartner=MyService.data.idUser;
      mensage.idAdmin=MyService.data.idUser;
      mensage.idFather=MyService.data.idFather;
      mensage.description=item.text;
      mensage.status="process";
      mensage.autor="admin";
      $http.post('https://www.thetixsapp.com:1350/supportTicket/',mensage);
      $modalInstance.dismiss('cancel');
       // $log.info('Product detail dismissed at: ' + new Date());
    };
$scope.isArray = function(category){
  
  return category.isArray(textStuff[0][1]) };
 $scope.isArray = angular.isArray;

    $scope.openSupportTicket=function(){
      $scope.mensage=true;
    };
     $scope.back=function(){
      $scope.mensage=false;
    };
  }])
  ; 
  app.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', '$http',function($scope, $modal, $log, $http) {
    $scope.items = [];
    

    
     $scope.openAddCategory = function () {
      // var identificador =item.id;
      var dato=[];
        var item=[];
        var datosCuenta="";
      var modalInstance = $modal.open({
        templateUrl: 'modalAddCategory.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
          resolve: {
              dato: function  () {
                return $scope.item;
              // body...vendedor
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
      }, function () {
        // $log.info('Add Category dismissed at: ' + new Date());
      });
    };

  $scope.openCategoryListing =function(item){
      var identificador = item;
      $http.get('https://www.thetixsapp.com:1350/category/').success(function(respuesta){        
        $scope.items=respuesta.results; 
        var dato=[];
        var item=[];
        var datosCuenta="";
        var modalInstance = $modal.open({
          templateUrl: 'modalCategoryListing.html',
          controller: 'ModalInstanceCtrl',
          size: 'md',
          resolve: {
              dato: function  () {
                return $scope.item;
              // body...vendedor
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
        }, function () {
          // $log.info('Category table dismissed at: ' + new Date());
        });
      }) 
    };



    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'modalNewPartner.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }])
  ; 
  app.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
  }])
  ; 
  app.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }])
  ; 
  app.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];

      for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
          var index = Math.floor((Math.random() * 4));
          $scope.stacked.push({
            value: Math.floor((Math.random() * 30) + 1),
            type: types[index]
          });
      }
    };
    $scope.randomStacked();
  }])
  ; 
  app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
  }])
  ; 
  app.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };
  }])
  ; 
  app.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
  }])
  ; 
  app.controller('TypeaheadDemoCtrl', ['$scope', '$http','MyService','$modal', function($scope, $http,MyService,$modal) {
    $scope.selected = undefined;
    $http.get('https://www.thetixsapp.com:1350/product/').then(function (resp) {
      $scope.tixs = resp.data.results;
    });

  $scope.selectTix=function(item){
    $scope.items=[];
    MyService.data.tix = item;
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
    modalInstance.result.then(function (item) {
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
        MyService.data.products=$scope.app.products; //conviertem en global el contador de carrito

    }, function () {

      // $log.info('Modal dismissed at: ' + new Date());
    });
    };
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
  }])
  ;
   

  app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
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
    $scope.format = $scope.formats[0];
  }])
  ; 
  app.controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      //console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }]);