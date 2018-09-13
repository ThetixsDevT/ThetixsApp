<?php
require 'PHPMailerAutoload.php';
echo !extension_loaded('openssl')?"Not Available":"Available <br/>";
$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = $_POST['managerAccountHost'];
$mail->Username = $_POST['emailSender'];                      // SMTP username
$mail->Password = $_POST['emailPass'];                           // SMTP password

// $mail->Host = 'email-smtp.us-east-1.amazonaws.com';
// $mail->Username = 'AKIAJVAQ2DMXZMFNPJ3Q';                      // SMTP username
// $mail->Password = 'AgAC4vcaHLA/EPJbQnVJBPIop9HZPfdICk0eSq1FDF+P';      // SMTP password

               ;       //  ssl://smtp.gmail.com          // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
// $mail->Username = $_POST['remitentemail'];                      // SMTP username


$mail->SMTPSecure = 'ssl';  //TLS                      // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;          //587                          // TCP port to connect to


$receiveremail= $_POST['receiveremail'];
$mail->setFrom($_POST['emailSender'], 'The|tixs');
//$mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
$mail->addAddress($receiveremail);               // Name is optional
//$mail->addReplyTo('$email','roshan');
//$mail->addCC('passmethecode@gmail.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Thetixs voucher';
$mail->Body    = 
   
    '<div align="center" style="background-color:#ffffff;">
        <div align="center" style="display:inline-block;
                                  height:auto;
                                  width:100%;">
  
          <div style="color:#4a4646; padding:30px; font-size:16px;" align="left">
            <br/>
___________________________________________
<br/>
========== TRANSACTION RECORD ==========
<br/>
THE TIXS GROUP INC
<br/>
1900 N BAYSHORE DR 3817
<br/>
MIAMI, FL 33132
<br/>
United States
<br/>
WWW.THETIXS.COM
<br/>
<br/>
TYPE: Purchase
<br/>
Ref:              '.$_POST['ref'].' 
<br/>
<br/>
ACCT:              '.$_POST['text'].' USD
<br/>
<br/>

<br/>
<br/>
 Approved - Thank You 100
<br/>
<br/>
<br/>
Please retain this copy for your records.
<br/>
<br/>
Cardholder will pay above amount to
card issuer pursuant to cardholder
agreement.
<br/>
========================================
<br/>
          *** Duplicate ***
        
          </div>    
        </div>
      </div>
 ';
//file_get_contents('template-guest.php');
// $mail->AltBody = 'Hello';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}
else {
// header('location: thankyou.php');
}
?>
