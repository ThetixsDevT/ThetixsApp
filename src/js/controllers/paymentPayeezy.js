'use strict';

/* Controllers */
  // signin controller
app.controller('PaymentController', ['$scope', '$http', '$state', 'MyService',function($scope, $http,$state,MyService) {
    //for showing #successNotification div

    $scope.isPaymentSuccess = false;
    // $scope.app.visor=true;
    //for disabling payment button
    $scope.isProcessing = false;
    //for disabling apple pay button
    $scope.supportApplePay = false;
   
    $scope.data = {
      product_id: "001",
      user: {},
      card: {},
      products: {
        "001": {
          "name": "Paper Origami 1:10,000 scale model (11 inch)",
          "value":"1.0",
        },
        "002": {
          "name": "Plastic 1:5000 scale model (22 inch)",
          "value":"49.0",
        },
        "003": {
          "name": "Metal & Concrete 1:1000 scale replica (9 feet)",
          "value":"5000.0",
        }
      }
    };
     $scope.data.user.amount=MyService.data.total;
    

    $scope.submitForm = function(){
      console.log($scope.data)
      $scope.isProcessing = true;
      $scope.paymentForm.requestCardNonce();
      return false
    }
    $scope.payment=function(item){
      $scope.isProcessing = true;
      var amount=$scope.app.total;
      var amount=amount.toFixed(2);
      // alert("amount:" +amount);
      var nm=item.nm;
      var cn=item.cn;
      var t=item.t;
      var vc=item.vc;
      var de=item.me+""+item.ye;
      // alert("Expiry Date: "+de);
      var cp=item.cp;
      $http({
        method:'POST',
        // url:'http://sohigh.com.ve/libs/payeezy_php/payeezy_payment.php',
        url:'libs/payeezy_php/payeezy_payment.php',
        data: 'amount='+amount+'&nm='+nm+'&t='+t+'&vc='+vc+'&de='+de+'&cp='+cp+'&cn='+cn,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).success(function(res){
          $scope.card_errors = []
        //    if (data.status == 400){
        //   // display server side card processing errors
        //   $scope.isPaymentSuccess = false;
        //   $scope.card_errors = []
        //   for (var i =0; i < data.errors.length; i++){
        //     $scope.card_errors.push({message: data.errors[i].detail})
        //   }
        // }else if (data.status == 200) {
        //   $scope.isPaymentSuccess = true;
        // }

         if (res.transaction_status== "Not Processed"){
          // alert("no");
            $scope.isPaymentSuccess = false;
            $scope.card_errors.push({message: res.Error.messages[0].description});         
            }else if (res.transaction_status == "approved") {
            $scope.isPaymentSuccess = true;
            $scope.data.transactionId = res.transaction_tag;
            console.log(res.transaction_tag);
            $scope.app.total=0;
            $scope.app.products=0;
            $scope.app.listTixs=$scope.app.productsList;
            $scope.app.productsList=[];
            $scope.app.transactionId=$scope.data.transactionId;
            $scope.okSale();
            $state.go('app.okCheckout');
        }



        $scope.isProcessing = false;
          // $scope.data.transactionId = res; //guarda el array completo
          

            })
        .error(function(){
        $scope.isPaymentSuccess = false;
        $scope.isProcessing = false;
        $scope.card_errors = [{message: "Processing error, please try again!"}];
      })
        ; 
    };
    


    // $scope.createCard();
$scope.prov=[];
$scope.genAl=function(){
  var numPosibilidades = 9999999 - 99;
  var aleat = Math.random() * numPosibilidades;
  aleat = Math.round(aleat);
  aleat =  parseInt( aleat);
  $scope.prov.folder=aleat;
};

$scope.genAl(); 

    $scope.okSale=function(item){
    
      var saleObj={};
      
      saleObj.total = MyService.data.total;
      saleObj.total=saleObj.total.toFixed(2);
      saleObj.transactionId=$scope.app.transactionId;
      saleObj.status="pending";
      saleObj.idUser=MyService.data.idUser;
      saleObj.idSale=$scope.prov.folder;

      var numPosibilidades = 9999999 - 99;
      var seter = Math.random() * numPosibilidades;
      seter = Math.round(seter);
      seter =  parseInt(seter);
      saleObj.seter=saleObj.idSale+seter;
      saleObj.productList=MyService.data.productsList;
      for (var i =0;i<saleObj.productList.length;i++){
        saleObj.productList[i].idSale=saleObj.idSale;
      };
      MyService.data.car=saleObj;
      $http.post('https://www.thetixsapp.com:1350/sale/', saleObj)
      MyService.data.productsList=[];
      $scope.app.productsList=[];
      $scope.app.products=0; 

     };
  }]);