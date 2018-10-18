<?php
require "connection.php";
if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) == "xmlhttprequest"){
    if(isset($_POST["classname1"]) && !empty($_POST["classname1"])
    && isset($_POST["classname2"]) && !empty($_POST["classname2"])
    && isset($_POST["limit"]) && !empty($_POST["limit"])){
        $stmt;
        if(isset($_POST["classname3"]) && !empty($_POST["classname3"])){
            $stmt = $mysqli->prepare("SELECT luckynumber, COUNT(id) AS occurrence FROM farewell WHERE class IN (?, ?, ?) GROUP BY luckynumber ORDER BY occurrence, luckynumber ASC LIMIT 1 OFFSET ?");
            $stmt->bind_param("sssi", $_POST["classname1"], $_POST["classname2"], $_POST["classname3"], $_POST["limit"]);
        }
        else{
            $stmt = $mysqli->prepare("SELECT luckynumber, COUNT(id) AS occurrence FROM farewell WHERE class IN (?, ?) GROUP BY luckynumber ORDER BY occurrence, luckynumber ASC LIMIT 1 OFFSET ?");
            $stmt->bind_param("ssi", $_POST["classname1"], $_POST["classname2"], $_POST["limit"]);
        }
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        echo json_encode($row['luckynumber']);
        $stmt->close();
    }
}
?>