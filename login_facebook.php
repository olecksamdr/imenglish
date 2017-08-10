<?php
  require_once('resources/config.php');
  require_once(LIBRARY_PATH.'/Facebook/autoload.php');

  $fb = new Facebook\Facebook([
    'app_id' => $config['facebook']['app_id'], // Replace {app-id} with your app id
    'app_secret' => $config['facebook']['app_secret'],
    'default_graph_version' => $config['facebook']['default_graph_version'],
    ]);

  $helper = $fb->getRedirectLoginHelper();

  $permissions = ['email']; // Optional permissions
  $facebookLoginUrl = $helper->getLoginUrl($config['facebook']['callback'], $permissions);
  //
  // echo '<a href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';
  // echo htmlspecialchars($loginUrl);
?>
