'use strict';
/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'MyService', 'toaster',function($scope, $http, $state, MyService, toaster) {
    $scope.user = {};
    $scope.app.demoUser=false;
    $scope.users=[];
    $scope.app.total=0;
    $scope.partners=[];
    $scope.full=[];
    $scope.app.products=0;
    $scope.app.customerName=[];
    $scope.app.customerEmail=[];
    $scope.app.idCar=0;
    $scope.app.productsList=[];
    $scope.app.listTixs=[];
    $scope.app.productsListComplete=[];
    $scope.app.montos=[];
    $scope.app.descriptions=[];
    $scope.authError = null;
    $scope.app.partnerToPrint=[];
    MyService.data.allProducts=[];
    $scope.app.idPartnerToPrint="";
    $scope.app.productToPrint=[];
    $scope.app.idTixToPrint="";
    $scope.app.imagesTixToPrint=[];
    $scope.app.notesTixsToPrint="";
     $scope.app.TixToPrint=[];
     $scope.app.visible=false;

     $scope.getinfo=function(){
      $http.get('https://www.thetixsapp.com:1350/conf').success(function(answer){
        MyService.data.adminAccount = answer.results[0].adminAccount;
        MyService.data.managerAccount = answer.results[0].managerAccount;
        MyService.data.supportAccount = answer.results[0].supportAccount;
         MyService.data.managerAccountHost = answer.results[0].managerAccountHost;
        MyService.data.supportAccountHost = answer.results[0].supportAccountHost;
        MyService.data.managerAccountPass = answer.results[0].managerAccountPass;
        MyService.data.supportAccountPass = answer.results[0].supportAccountPass;
         MyService.data.menV = answer.results[0].menV;
         MyService.data.menP = answer.results[0].menP;
      });
    };
    $scope.getinfo();
    $scope.loadUsers=function(){
      $http.get('https://www.thetixsapp.com:1350/usertixs').success(function(respuesta){
        $scope.users = respuesta.results;
        for (var i=0; i<$scope.users.length; i++) 
          {
            $scope.full.push($scope.users[i]);
          } 
      });
    };

    $scope.loadPartners=function(){
      $http.get('https://www.thetixsapp.com:1350/partner/' ).success(function(respuesta){
        $scope.partners = respuesta.results;    
        for (var i=0; i<$scope.partners.length; i++) 
          {
            $scope.partners[i].emailResp=$scope.partners[i].email;
            $scope.partners[i].email=$scope.partners[i].repEmail;

            $scope.full.push($scope.partners[i]);
          }
      });
    };
   
    $scope.loadVendors=function(){
      $http.get('https://www.thetixsapp.com:1350/vendor').success(function(respuesta){
        $scope.vendors = respuesta.results;
        for (var i=0; i<$scope.vendors.length; i++) 
          {
            $scope.full.push($scope.vendors[i]);
          } 
      });
    };

    $scope.loadUsers();
    $scope.loadPartners();
    $scope.loadVendors();
    
    $scope.login = function(user) {
     
      $scope.user=user;
      $scope.authError = null;
     for (var i=0; i<$scope.full.length; i++) 
      {
      if ($scope.full[i].email == $scope.user.email && $scope.full[i].password == $scope.user.password)         
        {
        if ($scope.full[i].level == 1 )
          {
            $scope.app.profile=$scope.full[i];
          MyService.data.name=$scope.full[i].name;
          MyService.data.email=$scope.full[i].email;
          MyService.data.password=$scope.full[i].password;
          MyService.data.level=$scope.full[i].level;
          $scope.app.nameUser=MyService.data.name;
          $scope.app.email=MyService.data.email;
          $scope.app.level=MyService.data.level;
          $scope.app.password=MyService.data.password;
          MyService.data.idUser=$scope.full[i].id;
          $scope.app.usuario=$scope.full[i].email;
          $state.go('app.welcome');
          } 
        if ($scope.full[i].level == 2 )
          {
            $scope.app.profile=$scope.full[i];
          MyService.data.name=$scope.full[i].repName;
          $scope.app.email=$scope.full[i].repEmail;
          MyService.data.email=$scope.full[i].emailResp;
          MyService.data.password=$scope.full[i].password;
          MyService.data.level=$scope.full[i].level;
          $scope.app.nameUser=MyService.data.name;
         
          $scope.app.level=MyService.data.level;


          $scope.app.password=MyService.data.password;
          MyService.data.idUser=$scope.full[i].id;
          // $scope.app.usuario=$scope.full[i].email; 
          //  if (typeof $scope.full[i].url==="undefined" || typeof $scope.full[i].account==="undefined" ) {
            
          //   $scope.app.complete="no";
          // }
          $state.go('app.welcome');
          } 
          if ($scope.full[i].level == 3 )
          {
          //     if ($scope.full[i].demoUser == true )
          // {
          //     $scope.app.demoUser=true;
          //     // alert("yea");
          // }
            $scope.app.profile=$scope.full[i];
          MyService.data.name=$scope.full[i].name;
          MyService.data.email=$scope.full[i].email;
          MyService.data.password=$scope.full[i].password;
          MyService.data.level=$scope.full[i].level;
          $scope.app.nameUser=MyService.data.name;
          $scope.app.email=MyService.data.email;
          $scope.app.level=MyService.data.level;
          $scope.app.password=MyService.data.password;
          MyService.data.idUser=$scope.full[i].id;
          $scope.app.usuario=$scope.full[i].email;
          // if (typeof $scope.full[i].url==="undefined") {
          //   $scope.app.complete="no";
          // }
          $state.go('app.welcome');
          } 
        // if (existente=="no"){
        //   existente="si";
        //   MyService.data.existente=existente;
        //   }
        }
      } 
    };
  }])
;
