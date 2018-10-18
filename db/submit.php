<?php
require "connection.php";
require "phpmailer/PHPMailer.php";

if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) == "xmlhttprequest"){
    if(isset($_POST["name"]) && !empty($_POST["name"])
    && isset($_POST["class"]) && !empty($_POST["class"])
    && isset($_POST["email"]) && !empty($_POST["email"])
    && isset($_POST["luckynumber"]) && !empty($_POST["luckynumber"])){
        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->setFrom("confirmation@armour-farewell.site", "Armour's Sleepover Party");
        $mail->addAddress($_POST["email"], $_POST["name"]);
        $mail->Subject = "Registration Confirmation";
        ob_start();
        $temp_name = $_POST["name"];
        $temp_class = $_POST["class"];
        $temp_lucky = $_POST["luckynumber"];
        include("generate-mail.php");
        $body = ob_get_contents(); 
        $mail->msgHTML($body);
        ob_end_clean();
        if (!$mail->send()) {
            echo json_encode("-1");
        } else {
            $stmt = $mysqli->prepare("INSERT INTO farewell VALUES (NULL, ?, ?, ?, ?)");
            $stmt->bind_param("sssi", $_POST["name"], $_POST["class"], $_POST["email"], $_POST["luckynumber"]);
            $stmt->execute();
            if($stmt->affected_rows < 0){
                echo json_encode("-1");
                return;
            }
            echo json_encode("1");
            $stmt->close();
        }
    }
}
?>