<?php
// CREDENCIALES SANDBOX
$serviceURL = 'https://api-cert.payeezy.com/v1/transactions';

$apiKey = "yKBs71GetDg8hLAGtBiJGlqhc6poywOc";
$apiSecret = "0ce56282c078c7c5b50da2cd3de5bd1911d079a0602db1f5c82cde381ca86540";
$token = "fdoa-89898a4f70d0b5f79da292ef9eb5206d89898a4f70d0b5f7";


// CREDENCIALES LIVE
// $serviceURL = 'https://api.payeezy.com/v1/transactions';
// $apiKey = "m0qmv2i1NpCbTVkRnkjy1PVC9NAP4vKe";
// $apiSecret = "e3b97e76f8dc5b4c25cd103763d752da1801f88f44fd4a77909abaf8ac3e735f";
// $token = "fdoa-2345cb08a7945713327a89ad3b20945d2345cb08a7945713";


$nonce = strval(hexdec(bin2hex(openssl_random_pseudo_bytes(4, $cstrong))));
$timestamp = strval(time()*1000); //time stamp in milli seconds


$payload = getPayload(setPrimaryTxPayload());

function processInput($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return strval($data);
  }

  function setPrimaryTxPayload(){

        // $card_holder_name = $card_number = $card_type = $card_cvv = $card_expiry = $currency_code = $merchant_ref="";

        // $card_holder_name = processInput("Joel Zambrano");
        // $card_number = processInput("5221282293235384");
        // $card_type = processInput("mastercard");
        // $card_cvv = processInput("173");
        // $card_expiry = processInput("0519");
     // $amount  =processInput("1200");


        $card_holder_name = $_POST['nm'];
        $card_number = intval($_POST['cn']);
        $card_type = $_POST['t'];
        $card_cvv = $_POST['vc'];
        $card_expiry =  $_POST['de'];
        
        $amount = intval($_POST['amount']);
        $amount=$amount*100;
        $currency_code = processInput("USD");
        $merchant_ref = processInput("Astonishing-Sale");

        $primaryTxPayload = array(
            "amount"=> $amount,
            "card_number" => $card_number,
            "card_type" => $card_type,
            "card_holder_name" => $card_holder_name,
            "card_cvv" => $card_cvv,
            "card_expiry" => $card_expiry,
            "merchant_ref" => $merchant_ref,
            "currency_code" => $currency_code,
        );

        return $primaryTxPayload;

}


/**
   * Payeezy
   *
   * Generate Payload
   */

   function getPayload($args = array())
  {
    $args = array_merge(array(
        "amount"=> "",
        "card_number" => "",
        "card_type" => "",
        "card_holder_name" => "",
        "card_cvv" => "",
        "card_expiry" => "",
        "merchant_ref" => "",
        "currency_code" => "",
        "transaction_tag" => "",
        "split_shipment" => "",
        "transaction_id" => "",

    ), $args);

    $data = "";
    
    $data = array(
              'merchant_ref'=> $args['merchant_ref'],
              'transaction_type'=> "purchase",
              'method'=> 'credit_card',
              'amount'=> $args['amount'],
              'currency_code'=> strtoupper($args['currency_code']),
              'credit_card'=> array(
                      'type'=> $args['card_type'],
                      'cardholder_name'=> $args['card_holder_name'],
                      'card_number'=> $args['card_number'],
                      'exp_date'=> $args['card_expiry'],
                      'cvv'=> $args['card_cvv'],
                    )
    );
   
    return json_encode($data, JSON_FORCE_OBJECT);
  }

// echo "<br><br> Request JSON Payload :" ;

// echo $payload ;

// echo "<br><br> Authorization :" ;

$data = $apiKey . $nonce . $timestamp . $token . $payload;

$hashAlgorithm = "sha256";

### Make sure the HMAC hash is in hex -->
$hmac = hash_hmac ( $hashAlgorithm , $data , $apiSecret, false );

### Authorization : base64 of hmac hash -->
$hmac_enc = base64_encode($hmac);

// echo "<br><br> " ;

// echo $hmac_enc;

// echo "<br><br>" ;

$curl = curl_init('https://api-cert.payeezy.com/v1/transactions'); //sandbox
// $curl = curl_init('https://api.payeezy.com/v1/transactions'); //live

$headers = array(
      'Content-Type: application/json',
      'apikey:'.strval($apiKey),
      'token:'.strval($token),
      'Authorization:'.$hmac_enc,
      'nonce:'.$nonce,
      'timestamp:'.$timestamp,
    );



curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);

curl_setopt($curl, CURLOPT_VERBOSE, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$json_response = curl_exec($curl);



$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

$response = json_decode($json_response, true);

// echo "<br><br> " ;
echo $json_response;

// if ( $status != 201 ) {
// die("Error: call to URL $serviceURL failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
// }

curl_close($curl);

// echo "Response is: ".$response."\n";

// echo "JSON response is: ".$json_response."\n";



?>