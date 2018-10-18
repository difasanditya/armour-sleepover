<?php 
/*require "phpmailer/PHPMailer.php";
require "phpmailer/SMTP.php";
require "phpmailer/Exception.php";
$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->isSMTP();
$mail->Host = "tls://smtp.gmail.com:587";
$mail->SMTPAuth = true;
$mail->Username = "ppti4bca@gmail.com";
$mail->Password = "armour2016";
$mail->setFrom("ppti4bca@gmail.com", "ARMOUR");
$mail->addAddress("ravian.hartono@gmail.com", "Difa Sanditya");
$mail->Subject = 'PHPMailer GMail SMTP test';
$mail->Body = "PHPMailer GMail SMTP test";
$mail->SMTPDebug = 4;
if (!$mail->send()) {
    //echo json_encode("-1" . $mail->ErrorInfo);
} else {
    echo json_encode("1");
}*/

    $from = "From: ARMOUR's Sleepover Party <farewell@armour.dx.am>";
    $to = $_GET["name"].' <'.$_GET["email"].'>' ;
    $subject = "Registration Confirmation";
    $body = "Hai, ".$_GET["name"]."!\n\n";
    $body .= "Pendaftaranmu telah kami terima dan kami ucapkan terima kasih telah mendaftar! Angka pilihanmu adalah ".$_GET["luckynumber"].". ";
    $body .= "Tunjukkan email ini saat mengambil hadiah! ";
    $body .= "Kami tunggu kedatanganmu di Armour's Sleepover Party!";
    $body .= "\n\nSalam hangat,\nARMOUR :)";
    if(mail($to,$subject,$body,$from)){
        echo 'E-mail message sent!'."\n";
        echo $_GET["email"]."\n";
        echo $_GET["name"];
    } else {
        echo 'E-mail delivery failure!';
    }
?>

<?php
/*
require "phpmailer/PHPMailer.php";
require "phpmailer/SMTP.php";
require "phpmailer/Exception.php";
$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = "somedummyemails@gmail.com";
$mail->Password = "iniP4$"."$"."word";
$mail->setFrom('ppti4bca@gmail.com', 'Armour');
$mail->addAddress("difasanditya@gmail.com", "Difa Sanditya");
$mail->Subject = 'PHPMailer GMail SMTP test';
$mail->Body = "PHPMailer GMail SMTP test";
if (!$mail->send()) {
    echo json_encode("-1");
} else {
    echo json_encode("1");
}*/
?>