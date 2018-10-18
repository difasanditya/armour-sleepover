<?php
require 'connection.php';
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
    if(isset($_POST["email"]) && !empty($_POST["email"])){
        $stmt = $mysqli->prepare("SELECT * FROM farewell WHERE email = ?");
        $stmt->bind_param("s", $_POST['email']);
        $stmt->execute();
        $stmt->store_result();
        echo json_encode($stmt->num_rows);
        $stmt->close();
    }
}
?>