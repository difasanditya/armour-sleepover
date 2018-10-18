<?php
require "connection.php";
if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) == "xmlhttprequest"){
    if(isset($_POST["classname1"]) && !empty($_POST["classname1"])
    && isset($_POST["classname2"]) && !empty($_POST["classname2"])){
        $stmt;
        if(isset($_POST["classname3"]) && !empty($_POST["classname3"])){
            $stmt = $mysqli->prepare("SELECT luckynumber, COUNT(id) AS occurrence FROM farewell WHERE class IN (?, ?, ?) GROUP BY luckynumber ORDER BY occurrence, luckynumber ASC LIMIT 3");
            $stmt->bind_param("sss", $_POST["classname1"], $_POST["classname2"], $_POST["classname3"]);
        }
        else{
            $stmt = $mysqli->prepare("SELECT luckynumber, COUNT(id) AS occurrence FROM farewell WHERE class IN (?, ?) GROUP BY luckynumber ORDER BY occurrence, luckynumber ASC LIMIT 3");
            $stmt->bind_param("ss", $_POST["classname1"], $_POST["classname2"]);
        }
        $stmt->execute();
        $data = array();
        $result = $stmt->get_result();
        while($row = $result->fetch_assoc()) {
            $numb = intval($row["occurrence"]);
            do {
                array_push($data, $row['luckynumber']);
                $numb = $numb - 1;
                if(count($data) > 2) break;
            } while($numb > 0);
            if(count($data) > 2) break;
        }
        echo json_encode($data);
        $stmt->close();
    }
}
?>