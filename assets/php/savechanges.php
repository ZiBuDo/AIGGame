<?php 


require "database.php";
require "file.php";
session_start();
$conn = connect();
$sprite = $_GET["sprite"];
$email = $_GET["email"];
$stmt = $conn->prepare("UPDATE `AIG_Players` SET Sprite = :sprite WHERE `Email` = :email");
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->bindParam(':sprite', $sprite, PDO::PARAM_STR);
$stmt->execute();
$_SESSION["sprite"] = $sprite;



?>