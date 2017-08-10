<?php
require_once('resources/config.php');
require_once(LIBRARY_PATH.'/Facebook/autoload.php');

if(!session_id()) {
    session_start();
}

$fb = new Facebook\Facebook([
  'app_id' => $config['facebook']['app_id'], // Replace {app-id} with your app id
  'app_secret' => $config['facebook']['app_secret'],
  'default_graph_version' => $config['facebook']['default_graph_version'],
  ]);

$helper = $fb->getRedirectLoginHelper();
$logoutURL = $helper->getLogoutUrl($_SESSION['fb_access_token'], '/');
// Remove access token from session
unset($_SESSION['fb_access_token']);

// Remove user data from session
unset($_SESSION['userData']);

// Redirect to the homepage
header("Location: /");
?>
