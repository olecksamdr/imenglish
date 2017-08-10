<?php
  if(!session_id()) {
     session_start();
  }

  require_once(__DIR__.'/../config.php');
  require_once(__DIR__.'/../db_config.php');

  function sendErrors($errorsArray) {
    header('HTTP/1.1 400 Bad Request');
    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode(array('errors' => $errorsArray));
  }

  function sendDataToClient($dataArray) {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($dataArray);
  }

  // return assoc array
  function loadReviewsByType($conn, $review_type) {
    $query = '';

    if ($review_type === 'confirmed') {
      $query = <<<SQL
        SELECT usr.first_name, usr.last_name, usr.picture, msg.text, msg.id
        FROM `messages` as msg INNER JOIN `users` as usr on msg.user_id = usr.id
        WHERE msg.approved = TRUE ORDER BY msg.created desc LIMIT 10
SQL;
    }
    else if ($review_type === 'not-confirmed') {
      $query = <<<SQL
        SELECT usr.first_name, usr.last_name, usr.picture, msg.text, msg.id
        FROM `messages` as msg INNER JOIN `users` as usr on msg.user_id = usr.id
        WHERE msg.approved = FALSE ORDER BY msg.created desc LIMIT 10
SQL;
    }
    else if ($review_type === 'all') {
      $query = <<<SQL
        SELECT usr.first_name, usr.last_name, usr.picture, msg.text, msg.id
        FROM `messages` as msg INNER JOIN `users` as usr on msg.user_id = usr.id
        ORDER BY msg.created desc LIMIT 10
SQL;
    }

    return $conn->query($query)->fetch_all(MYSQLI_ASSOC);
  }

  if (isset($_SESSION['userData'])) {
    if ($_SESSION['userData']['oauth_uid'] === $config['admin']['oauth_uid']) {
      $reviews_type = $_GET['reviews_type'];
      $load_more = ( $_GET['load_more'] === 'true' );

      // $conn we get from db_config.php
      if($conn->connect_error)
          sendErrors(array('error' => "Failed to connect with MySQL: " . $conn->connect_error));

      $not_confirmed_resoult = $conn->query('SELECT count(*) from `messages` WHERE `approved` = FALSE')->fetch_array();
      $confirmed_resoult = $conn->query('SELECT count(*) from `messages` WHERE `approved` = TRUE')->fetch_array();

      $not_confirmed_reviews_count = $not_confirmed_resoult[0];
      $confirmed_reviews_count = $confirmed_resoult[0];
      $all_reviews_count = $not_confirmed_reviews_count + $confirmed_reviews_count;

      if (!$load_more) {
        $result_array = array('counts' => array(
          'not_confirmed' => $not_confirmed_reviews_count,
          'confirmed' => $confirmed_reviews_count,
          'all' => $all_reviews_count
          ),
          'data' => loadReviewsByType($conn, $reviews_type)
        );

        sendDataToClient($result_array);
      } else {

      }

    } // end if which check user oauth_uid
    else {
      sendErrors(array('not Authorized'));
    }
  }  // isset($_SESSION['userData'])
  else {
    sendErrors(array('not Authorized'));
  }
 ?>
