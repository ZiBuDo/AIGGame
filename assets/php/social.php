<?php
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
require "database.php";
require "file.php";

$request = $_GET["request"];
session_start();
if($request == "addFriend"){
	$name = $_GET["name"];
	$email = $_GET["email"];
	$conn = connect();
	//get social, update it, then write it back
	$stmt = $conn->prepare("SELECT * FROM `AIG_Players` WHERE `Email` = :email");
	$stmt->bindParam(':email', $email, PDO::PARAM_STR);
	$stmt->execute();
	$result = $stmt->fetchAll();
	$player = $result[0];
	$social = json_decode($player["Social"],true);
	$social[] = $name;
	$social = json_encode($social);
	$stmt = $conn->prepare("UPDATE `AIG_Players` SET `Social` = :social WHERE `Email` = :email");
	$stmt->bindParam(':email', $email, PDO::PARAM_STR);
	$stmt->bindParam(':social', $social, PDO::PARAM_STR);
	$stmt->execute();
	$_SESSION["social"] = json_encode($social);
}

if($request == "removeFriend"){
	$name = $_GET["name"];
	$email = $_GET["email"];
	$conn = connect();
	//get social, update it, then write it back
	$stmt = $conn->prepare("SELECT * FROM `AIG_Players` WHERE `Email` = :email");
	$stmt->bindParam(':email', $email, PDO::PARAM_STR);
	$stmt->execute();
	$result = $stmt->fetchAll();
	$player = $result[0];
	$social = json_decode($player["Social"],true);
	$del = 0;
	for($i = 0; $i < count($social); $i++){
		if($social[$i] == $name){
			$del = $i;
			break;
		}
	}
	unset($social[$del]);
	$social = json_encode($social);
	$stmt = $conn->prepare("UPDATE `AIG_Players` SET `Social` = :social WHERE `Email` = :email");
	$stmt->bindParam(':email', $email, PDO::PARAM_STR);
	$stmt->bindParam(':social', $social, PDO::PARAM_STR);
	$stmt->execute();
	$_SESSION["social"] = json_encode($social);
}

if($request == "minigame"){
	$riskNew = $_GET["risk"];
	$email = $_GET["email"];
	$conn = connect();
	
	$stmt = $conn->prepare("UPDATE `AIG_Players` SET `Risk` = :risk WHERE `Email` = :email");
	$stmt->bindParam(':email', $email, PDO::PARAM_STR);
	$stmt->bindParam(':risk', $riskNew, PDO::PARAM_STR);
	$stmt->execute();
	$_SESSION["risk"] = $riskNew;
}

if($request == "decision"){
	$_SESSION["decisions"] = $_GET["dec"];
	$_SESSION["risk"] = $_GET["risk"];
}

?>