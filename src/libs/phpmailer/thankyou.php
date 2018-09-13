<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <meta name="HandheldFriendly" content="true" />
    <title>Thank You</title>
    <link href='' rel='stylesheet' type='text/css'>
    <script type="text/javascript" src="https://submit.jotform.me/js/prototype.js"></script>
    <script type="text/javascript" src="jquery.min.js"></script> 
      <script type="text/javascript">
        $(document).ready(function(){
            var number=3;
            var url='../index.html'; 
            function countdown(){
                setTimeout(countdown, 1000);
                $('#box').html("Redirecting in &nbsp;<h3>" + number + "</h3>&nbsp;seconds.");
                number--;
                   if(number<0){
                window.location=url;
                       number=0;
            }
            }
            countdown();
        });
      </script>
    <style type="text/css">
      @import url();
      * {
        -moz-box-sizing:border-box;
        -webkit-box-sizing:border-box;
        box-sizing:border-box;
        *behavior:url(js/boxsizing.htc);
      }
      html, body { width:100%; margin:0px; padding:0px; }
      body {
        background: url('') #f5f5f5;
        background-repeat: repeat;
        background-attachment: scroll;
        background-position: center top;
        background-size: auto;
        
        font-family: 'Lucida Grande';
        font-size: 14px;
        color: #555;
        text-align:center;
      }
      .form-all {
        background: url('') #fff;
        background-repeat: repeat;
        background-attachment: scroll;
        background-position: center top;
        background-size: auto;
        
        width: 100%;
        max-width: 690px;
        margin: 36px auto;
        padding: 35px 29px ;
        -webkit-box-shadow: 0 4px 4px -1px rgba(0,0,0,0.1);
        box-shadow: 0 4px 4px -1px rgba(0,0,0,0.1);
      }
      @media screen and (max-width: 690px), screen and (max-device-width: 768px) and (orientation: portrait), screen and (max-device-width: 415px) and (orientation: landscape) {
        body {
          background-color: #fff;
        }
        .form-all {
          margin-top: 0;
          border: 0;
          -webkit-box-shadow: none;
          box-shadow: none;
        }
      }
      @media print {
       body {
        background: white;
        color: black;
       }

       .form-all {
        margin:0 auto;
        max-width: 100%;
        box-shadow: none;
        background:white;
        float:none;
        width: 690px;
       } 
       img {
        max-width: 100% !important;
        page-break-inside: avoid;
       }

      }
    </style>
    
    <link href="css/print-new.css" rel="stylesheet" type="text/css" media="print">
  </head>
  <body class="thankyou">
    <div id="stage" class="form-all"><p style="text-align:center;"><img src="https://cdn.jotfor.ms/img/check-icon.png" alt="" width="128" height="128" /></p><div style="text-align:center;"><h1 style="text-align: center;">Thank You!</h1><p style="text-align: center;">Your submission has been received.<div id="box"></div>
        </p></div></div>
  </body>
  <script type="text/javascript">
    if (window.parent !== window) { window.parent.postMessage('setHeight:' + $$('body')[0].getHeight(), '*'); }
  </script>
</html>
