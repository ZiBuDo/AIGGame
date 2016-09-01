<?php
/*
	Exit codes:
		0 - Successful login
		1 - Successful Sign up
		2 - screen name in use
		3 - email incorrect
		4 - email is in use
		5 - email needs to be activated
		6 - password incorrect
*/


if(!function_exists('hash_equals'))
{
    function hash_equals($str1, $str2)
    {
        if(strlen($str1) != strlen($str2))
        {
            return false;
        }
        else
        {
            $res = $str1 ^ $str2;
            $ret = 0;
            for($i = strlen($res) - 1; $i >= 0; $i--)
            {
                $ret |= ord($res[$i]);
            }
            return !$ret;
        }
    }
}

require "database.php";
require "file.php";
require 'PHPMailerAutoload.php';

$screen = $_GET["screenName"];
$email = strtolower($_GET["email"]);
$password = $_GET["password"];
$config = json_decode(readFileInput('sql.cfg'),true);
$smtpUser = $config[2];
$smtpPass = $config[3];
$smtpServer = $config[4];
$conn = connect();

$signup = true;
//check screen name
$stmt = $conn->prepare("SELECT * FROM `AIG_Players` WHERE `Name` = :name");
$stmt->bindParam(':name', $screen, PDO::PARAM_STR);
$stmt->execute();
$result = $stmt->fetchAll();
$rows = $stmt->rowCount();
if($rows != 0){
	//screen name already in use, check if email matches
	$signup = false;
}else{
	//check if emails don't match
	$stmt = $conn->prepare("SELECT * FROM `AIG_Players` WHERE `Name` = :name");
	$stmt->bindParam(':name', $screen, PDO::PARAM_STR);
	$stmt->execute();
	$result = $stmt->fetchAll();
	$rows = $stmt->rowCount();
	if($rows != 0){
		echo "4";
		exit("4");
	}else{
		//email and screen don't match, sign them up!
		$risk = "[50,50,50,50,50,50,50]";
		$social = "[]";
		$cost = 10;
		$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
		$salt = sprintf("$2a$%02d$", $cost) . $salt;
		$hash = crypt($password, $salt);
		$activate = generateRandomString();
		$stmt = $conn->prepare("INSERT INTO `AIG_Players`(`Name`, `Email`, `Sprite`, `Password`, `Activation`, `Activated`,`Risk`,`Social`) VALUES (:screen,:email,'general/alberto.png',:hash,:activate,'No',:risk,:social)");
		$stmt->bindParam(':screen', $screen, PDO::PARAM_STR);
		$stmt->bindParam(':email', $email, PDO::PARAM_STR);
		$stmt->bindParam(':hash', $hash, PDO::PARAM_STR);
		$stmt->bindParam(':activate', $activate, PDO::PARAM_STR);
		$stmt->bindParam(':risk', $risk, PDO::PARAM_STR);
		$stmt->bindParam(':social', $social, PDO::PARAM_STR);
		$stmt->execute();
		$mail = new PHPMailer();
		$mail->CharSet = 'UTF-8';

		$mail->Host       = $smtpServer;
		$mail->SMTPDebug  = 3;
		$mail->SMTPAuth   = true;                  
		$mail->Username   = $smtpUser; 
		$mail->Password   = $smtpPass;  
		$mail->SMTPSecure = 'tls'; 
		$mail->Port = 587; 		
		$mail->setFrom('noreply@miscthings.xyz', 'No Reply Miscthings');
		$mail->addAddress($email, $screen);
		$mail->isHTML(true);
		$mail->Subject = 'AIG Game Email Validation';
		$mail->Body    = "<p>Hello,</p><br>
			<p>Thanks for signing up as $screen at <a href='http://projects.miscthings.xyz/AIG/'>http://projects.miscthings.xyz/AIG/</a>.</p>
			<p>Please paste the link to activate your account: <a href='http://projects.miscthings.xyz/AIG/index.html?activate=$activate&email=$email'>http://projects.miscthings.xyz/AIG/index.html?activate=$activate&email=$email</a> </p>
			<br>
			<p>Best Regards,</p>
			<p>AIG Game</p>";
		$mail->AltBody = "Thanks for signing up as $screen at http://projects.miscthings.xyz/AIG/ . Please paste the link to activate your account: http://projects.miscthings.xyz/AIG/index.html?activate=$activate&email=$email";
		$mail->send();
		exit("1");
	}
}

if($signup == false){
	$player = $result[0];
	if($player["Email"] == $email){
		//emails match check password
		$hash = $player["Password"];
		if(hash_equals($hash, crypt($password,$hash))){
			//Password checks, check if account is email validated
			if($player["Activated"] == "Yes"){
				//email is validated
				session_start();
				$_SESSION["screen"] = $player["Name"];
				$_SESSION["sprite"] = $player["Sprite"];
				$_SESSION["email"] = $player["Email"];
				$_SESSION["social"] = $player["Social"];
				$_SESSION["risk"] = $player["Risk"];
				$_SESSION["decisions"] = 0;
				exit("0");
			}else{
				exit("5");
			}
		}else{
			exit("6");
		}
	}else{
		exit("3");
	}
}


function generateRandomString() {
	$length = 10;
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}




?>