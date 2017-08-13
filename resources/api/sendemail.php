<?php

  require_once(__DIR__.'/../config.php');

  $to = $my_email; // $my_email get from config.php

  $from = transftom($_POST['email']);
  $name = transftom($_POST['name']);
  $phone = transftom($_POST['phone']);
  // $skype = transftom($_POST['skype']);
  // $message = transftom($_POST['message']);

  function transftom($data) {
    $data = trim($data);
    $data = strip_tags($data);
    $data = htmlspecialchars($data);

    return $data;
  }

  function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
  }

  function isValidPhone($phone) {
	return strlen($phone) == 10 && ctype_digit($phone);
  }

  function sendErrors($errorsArray) {
	  header('HTTP/1.1 400 Bad Request');
    header('Content-Type: application/json; charset=UTF-8');

    json_encode(array('errors' => errorsArray));
  }

  $errorsArray = array();

  if (!isValidEmail($from))
    $errorsArray[] = 'Email не действителен';

  if (!isValidPhone($phone))
    $errorsArray[] = 'Неверный формат номера';

  if (count($errorsArray) != 0)
    sendErrors($errorsArray);
  else {
		/**
		 * This example shows settings to use when sending via Google's Gmail servers.
		 */

		//SMTP needs accurate times, and the PHP time zone MUST be set
		//This should be done in your php.ini, but this is how to do it if you don't have access to that
		date_default_timezone_set('Etc/UTC');

		require(LIBRARY_PATH.'/PHPMailer/PHPMailerAutoload.php');

		//Create a new PHPMailer instance
		$mail = new PHPMailer;
		$mail->CharSet = 'UTF-8';

		//Tell PHPMailer to use SMTP
		$mail->isSMTP();

		//Enable SMTP debugging
		// 0 = off (for production use)
		// 1 = client messages
		// 2 = client and server messages
		$mail->SMTPDebug = 0;

		//Ask for HTML-friendly debug output
		$mail->Debugoutput = 'html';

		//Set the hostname of the mail server
		$mail->Host = 'smtp.gmail.com';
		// use
		// $mail->Host = gethostbyname('smtp.gmail.com');
		// if your network does not support SMTP over IPv6

		//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
		$mail->Port = 587; // ssl - 465, 587 - tls;

		//Set the encryption system to use - ssl (deprecated) or tls
		$mail->SMTPSecure = 'tls';

		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;

		//Username to use for SMTP authentication - use full email address for gmail
		$mail->Username = $config['email']['username'];

		//Password to use for SMTP authentication
		$mail->Password = $config['email']['password'];

		//Set who the message is to be sent from
		$mail->setFrom($from, $name);

		//Set an alternative reply-to address
		$mail->addReplyTo($from, $name);

		//Set who the message is to be sent to
		$mail->addAddress($config['email']['send_to'], 'I.M. English');

		//Set the subject line
		$mail->Subject = "Заявка на урок від $name";

		$htmlMessage = "<h1> Заявка на урок від $name </h1>";
		$htmlMessage .= "<h2> email: $from </h2>";
		// $htmlMessage .= "<h2> skype: $skype </h2>";
		$htmlMessage .= "<h2> моб.: $phone </h2>";
		// $htmlMessage .= "<p>{$message}</p>";


		//Read an HTML message body from an external file, convert referenced images to embedded,
		//convert HTML into a basic plain-text alternative body
		$mail->msgHTML($htmlMessage, dirname(__FILE__));


		$textMessage = "Заявка на урок від $name \n";
		$textMessage .= "email: $from \n";
		// $textMessage .= "skype: $skype \n";
		$textMessage .= "моб.: $phone \n";
		// $textMessage .= $message;

		//Replace the plain text body with one created manually
		$mail->AltBody = $textMessage;

		//Attach an image file
		//$mail->addAttachment('images/phpmailer_mini.png');

		//send the message, check for errors
		if (!$mail->send()) {
			sendErrors(array('Не удалось отправить email'));
		} else {
			echo "ok";
		}
  }
?>
