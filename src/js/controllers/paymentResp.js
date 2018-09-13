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
    
 $scope.createCard=function(){
      $scope.paymentForm = new SqPaymentForm({
      applicationId: 'sandbox-sq0idp-IsHp4BXhhVus21G5JPyYpw',
      locationId: 'CBASECJCvmqtoIL1fn3iReEjQRcgAQ',
      inputClass: 'sq-input',
      inputStyles: [
          {
            fontSize: '14px',
            padding: '7px 12px',
            backgroundColor: "transparent"
          }
        ],
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '•••• •••• •••• ••••'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: '33114'
      },
      applePay: {
        elementId: 'sq-apple-pay'
      },

      callbacks: {
      cardNonceResponseReceived: function(errors, nonce, cardData) {
          if (errors){
            $scope.card_errors = errors
            $scope.isProcessing = false;
             // if ($scope.$$phase == '$apply' || $scope.$$phase == '$digest' ) {
             //  setTimeout(function() {
             //     $scope.$apply();
             //  }, 3000)
           
             //          }

                       //             setTimeout(function() {
            $scope.$apply(); // required since this is not an angular function
            //  })
          }else{
            $scope.card_errors = []
            $scope.chargeCardWithNonce(nonce);
          }
// setTimeout(function() {}, 3000);

        },
        unsupportedBrowserDetected: function() {
          // Alert the buyer
        },
        methodsSupported: function (methods) {
          console.log(methods);
          $scope.supportApplePay = true
           if ($scope.$$phase == '$apply' || $scope.$$phase == '$digest' ) {
                        setTimeout(function() {
                 $scope.$apply();
              }, 3000)

         
                      }
           //               setTimeout(function() {
          // $scope.$apply(); // required since this is not an angular function
          // })
        },
        createPaymentRequest: function () {
          var product = $scope.data.products[$scope.data.product_id];
          return {
            requestShippingAddress: true,
            currencyCode: "USD",
            countryCode: "US",
            total: {
              label: product["name"],
              amount: product["value"],
              pending: false,
            }
          };
        },
        // Fill in these cases to respond to various events that can occur while a
        // buyer is using the payment form.
        inputEventReceived: function(inputEvent) {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              // Handle as desired
              break;
            case 'focusClassRemoved':
              // Handle as desired
              break;
            case 'errorClassAdded':
              // Handle as desired
              break;
            case 'errorClassRemoved':
              // Handle as desired
              break;
            case 'cardBrandChanged':
              // Handle as desired
              break;
            case 'postalCodeChanged':
              // Handle as desired
              break;
          }
        }
      }
    });
 };

    $scope.createCard();
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
      // saleObj.state=$scope.item.status;
      saleObj.total = MyService.data.total;
      // saleObj.productsList=MyService.data.allProducts;
      saleObj.transactionId=$scope.app.transactionId;
      // saleObj.productsPrices=$scope.item.productsPrices;
      // saleObj.amount=saleObj.total;
      saleObj.status="pending";
      // saleObj.ListComplete=$scope.item.detail;
      saleObj.idUser=MyService.data.idUser;
      // saleObj.montos=$scope.app.montos;
      // saleObj.descriptions=$scope.app.descriptions;
      // saleObj.allProducts=MyService.data.allProducts;
      // MyService.data.allProducts=[];
      saleObj.productList=MyService.data.productsList;
      // saleObj.productsListComplete=MyService.data.productsListComplete;
      saleObj.cer=$scope.prov.folder;

      saleObj.ser=($scope.prov.folder*2); 
      MyService.data.car=saleObj;
      $http.post('https://www.thetixsapp.com:1350/sale/', saleObj)
      MyService.data.productsList=[];
      $scope.app.productsList=[];
      $scope.app.products=0;   
       // $state.go('app.invoice');
     };


    $scope.chargeCardWithNonce = function(nonce) {

      var url = "libs/php_payment/process-card.php";
      var amount=$scope.app.total;
      var data = {
        amount: $scope.app.total,
        nonce: nonce,
        product_id: $scope.data.product_id,
        name: $scope.data.user.name,
        email: $scope.data.user.email,
        street_address_1: $scope.data.user.street_address_1,
        street_address_2: $scope.data.user.street_address_2,
        city: $scope.data.user.city,
        state: $scope.data.user.state,
        zip: $scope.data.user.zip
      };


       $http({
        method:'POST',
        url:'libs/php_payment/process-card.php',
        data: 'nonce='+nonce+'&amount='+amount+'&data='+data,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).success(function(res){
           if (data.status == 400){
          // display server side card processing errors
          $scope.isPaymentSuccess = false;
          $scope.card_errors = []
          for (var i =0; i < data.errors.length; i++){
            $scope.card_errors.push({message: data.errors[i].detail})
          }
        }else if (data.status == 200) {
          $scope.isPaymentSuccess = true;
        }
        $scope.isProcessing = false;
          $scope.data.transactionId = res;
              console.log(res);
              nonce="";
              $scope.app.total=0;
              $scope.app.products=0;
              $scope.app.productsList=[];
              $scope.app.transactionId=$scope.data.transactionId;
        $scope.okSale();
        $state.go('app.okCheckout');

            })
        .error(function(){
        $scope.isPaymentSuccess = false;
        $scope.isProcessing = false;
        $scope.card_errors = [{message: "Processing error, please try again!"}];
      })
        ; 




      // $http.post(url, data).success(function(data, status) {
      //   if (data.status == 400){
      //     // display server side card processing errors
      //     $scope.isPaymentSuccess = false;
      //     $scope.card_errors = []
      //     for (var i =0; i < data.errors.length; i++){
      //       $scope.card_errors.push({message: data.errors[i].detail})
      //     }
      //   }else if (data.status == 200) {
      //     $scope.isPaymentSuccess = true;
      //   }
      //   $scope.isProcessing = false;
      // }).error(function(){
      //   $scope.isPaymentSuccess = false;
      //   $scope.isProcessing = false;
      //   $scope.card_errors = [{message: "Processing error, please try again!"}];
      // })

    }

    //build payment form after controller loads
    var init = function () {
       $scope.paymentForm.build()
    };
    init();

  }]);