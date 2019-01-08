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

$mail->Subject = 'Your Tixs';
$mail->Body    = 
   
    '<div align="center" style="background-color:#f6f8f8;">
        <div align="center" style="display:inline-block;
                                  height:auto;
                                  width:100%;">
          <div style="
             background-color:#333244;
             display:inline-block;
             width:100%;
             height:auto;
             text-align:center;
             color:#fff;
             align-content:center;
             ">
            <div align="center" style="padding:10px;" >
              <img src="https://www.thetixsapp.com/web/img/logoT.png">
            </div>
          </div>

          <div style="color:#4a4646; padding:30px; font-size:20px;" align="left">
            <br/>
            Dear <b>'.$_POST['name'].'</b>, 
            '.$_POST['text'].'&'.$_POST['t'].'        
          </div>
          
          

        
          <div style="height:30px;">
          </div>
          
          <div style="
             background-color:#333244;
             display:inline-block;
             width:100%;
             height:auto;
             text-align:center;
             color:#fff;
             align-content:center;
             ">
            <div align="center" style="padding:10px;" >
               <h4 style="color:#fff;  "> 
                  <a href="https://www.thetixsapp.com" style="color:#fff;">The|Tixs Team
                  </a>
               </h4>
            </div>
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
