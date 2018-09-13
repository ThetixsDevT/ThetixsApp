<?php

require 'vendor/autoload.php';

# Replace these values. You probably want to start with your Sandbox credentials
# to start: https://docs.connect.squareup.com/articles/using-sandbox/

# The access token to use in all Connect API requests. Use your *sandbox* access
# token if you're just testing things out.
$access_token = 'sandbox-sq0atb-LbE5HVtXzHDRVb4L_i9oEA';

# Helps ensure this code has been reached via form submission
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
  error_log("Received a non-POST request");
  echo "Request not allowed";
  http_response_code(405);
  return;
}

# Fail if the card form didn't send a value for `nonce` to the server
$nonce = $_POST['nonce'];
$amount = intval($_POST['amount']);
if (is_null($nonce)) {
  echo "Invalid card data";
  http_response_code(422);
  return;
}

\SquareConnect\Configuration::getDefaultConfiguration()->setAccessToken($access_token);
$locations_api = new \SquareConnect\Api\LocationsApi();

try {
  $locations = $locations_api->listLocations();
  #We look for a location that can process payments
  $location = current(array_filter($locations->getLocations(), function($location) {
    $capabilities = $location->getCapabilities();
    return is_array($capabilities) &&
      in_array('CREDIT_CARD_PROCESSING', $capabilities);
  }));

} catch (\SquareConnect\ApiException $e) {
  // echo "Caught exception!<br/>";
  // print_r("<strong>Response body:</strong><br/>");
  // echo "<pre>"; var_dump($e->getResponseBody()); echo "</pre>";
  // echo "<br/><strong>Response headers:</strong><br/>";
  // echo "<pre>"; var_dump($e->getResponseHeaders()); echo "</pre>";
   $transaction = $result->getTransaction();
  $transactionID = $transaction["tenders"][0]["transaction_id"];
  $result= $transactionID;

  exit(1);
}

$transactions_api = new \SquareConnect\Api\TransactionsApi();

$request_body = array (

  "card_nonce" => $nonce,

  # Monetary amounts are specified in the smallest unit of the applicable currency.
  # This amount is in cents. It's also hard-coded for $1.00, which isn't very useful.
  "amount_money" => array (
    "amount" => $amount,
    "currency" => "USD"
  ),

  # Every payment you process with the SDK must have a unique idempotency key.
  # If you're unsure whether a particular payment succeeded, you can reattempt
  # it with the same idempotency key without worrying about double charging
  # the buyer.
  "idempotency_key" => uniqid()
);

# The SDK throws an exception if a Connect endpoint responds with anything besides
# a 200-level HTTP code. This block catches any exceptions that occur from the request.
try {
  $result = $transactions_api->charge($location->getId(), $request_body);
  $transaction = $result->getTransaction();
  $transactionID = $transaction["tenders"][0]["transaction_id"];
  $result= $transactionID;

  // echo "<pre>";
  print_r($result);
  // echo "</pre>";
} catch (\SquareConnect\ApiException $e) {
  // echo "Caught exception!<br/>";
  // print_r("<strong>Response body:</strong><br/>");
  // echo "<pre>"; var_dump($e->getResponseBody()); echo "</pre>";
  // echo "<br/><strong>Response headers:</strong><br/>";
  // echo "<pre>"; var_dump($e->getResponseHeaders()); echo "</pre>";
   $transaction = $result->getTransaction();
  $transactionID = $transaction["tenders"][0]["transaction_id"];
  $result= $transactionID;

}
