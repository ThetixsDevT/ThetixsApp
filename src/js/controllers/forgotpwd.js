'use strict';

/* Controllers */
  // signin controller
app.controller('ForgotpwdController', ['$scope', '$http', '$state', 'MyService', 'toaster',function($scope, $http, $state, MyService, toaster) {
    $scope.user = {};
    $scope.app.got=0;
    $scope.users=[];
    $scope.app.total=0;
    $scope.partners=[];
    $scope.full=[];
    $scope.app.products=0;
    $scope.app.idCar=0;
    $scope.app.productsList=[];
    $scope.authError = null;
    MyService.data.allProducts=[];

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
    


$scope.send=function(){
      item.repEmail=item.email;
      item.receiveremail=item.email;
     
};

    $scope.check = function(user) {
     
      $scope.user=user;
      $scope.authError = null;
     for (var i=0; i<$scope.full.length; i++) 
      {
      if ($scope.full[i].email == $scope.user.email )         
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
          $scope.app.got=1;
          $scope.app.usuario=$scope.full[i].email;
           var text="Your credentials...";
          var footer="Manager";
          $http({
            method:'POST',
            url:'libs/phpmailer/forgotPwd.php',
            data: 'name='+ $scope.app.nameUser+'&receiveremail='+MyService.data.email+'&email='+MyService.data.email+'&footer='+footer+'&text='+text+'&password='+$scope.app.password+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost,
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
            });



          // $state.go('app.welcome');
          } 
        if ($scope.full[i].level == 2 )
          {
            $scope.app.profile=$scope.full[i];
          MyService.data.name=$scope.full[i].repName;
          MyService.data.email=$scope.full[i].email;
          MyService.data.password=$scope.full[i].password;
          MyService.data.level=$scope.full[i].level;
          $scope.app.nameUser=MyService.data.name;
          $scope.app.email=MyService.data.email;
          $scope.app.level=MyService.data.level;
          $scope.app.password=MyService.data.password;
          MyService.data.idUser=$scope.full[i].id;
          $scope.app.usuario=$scope.full[i].email; 
          $scope.app.got=1;
          // var item=[];
          var text="Your credentials...";
          var footer="Manager";
          $http({
            method:'POST',
            url:'libs/phpmailer/forgotPwd.php',
            data: 'name='+ $scope.app.nameUser+'&receiveremail='+MyService.data.email+'&email='+MyService.data.email+'&footer='+footer+'&text='+text+'&password='+$scope.app.password+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost,
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
            });
          // $state.go('app.welcome');
          } 
          if ($scope.full[i].level == 3 )
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
          $scope.app.got=1;
           var text="Your credentials...";
          var footer="Manager";
          $http({
            method:'POST',
            url:'libs/phpmailer/forgotPwd.php',
            data: 'name='+ $scope.app.nameUser+'&receiveremail='+MyService.data.email+'&email='+MyService.data.email+'&footer='+footer+'&text='+text+'&password='+$scope.app.password+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost,
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
            });
          // $state.go('app.welcome');
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
