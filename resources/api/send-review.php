<?php
require_once(__DIR__.'/../config.php');

function transftom($data) {
  $data = trim($data);
  $data = strip_tags($data);
  $data = htmlspecialchars($data);

  return $data;
}

function sendErrors($errorsArray) {
  header('HTTP/1.1 400 Bad Request');
  header('Content-Type: application/json; charset=UTF-8');

  json_encode(array('errors' => errorsArray));
}


$user_id = $_POST['user_id'];
$review_message = transftom($_POST['review_message']);

$conn = new mysqli( $config['db']['host'],
                    $config['db']['username'],
                    $config['db']['password'],
                    $config['db']['name']
                  );

if($conn->connect_error)
    sendErrors(array('error' => "Failed to connect with MySQL: " . $conn->connect_error));

if(!empty($review_message) && !empty($user_id)) {
  $stmt = $conn->prepare('INSERT INTO messages (user_id, text, created, approved) VALUES (?, ?, ?, ?)');

  $date = date("Y-m-d H:i:s");
  $approved = 1; // true

  $stmt->bind_param('issi', $user_id, $review_message, $date, $approved);

  if ( $stmt->execute() ) {
      echo 'ok';
  } else {
    sendErrors(array('error' => 'error'));
  }
}
?>
