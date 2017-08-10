<?php
if(!session_id()) {
    session_start();
}

require_once('resources/config.php');
require_once(LIBRARY_PATH.'/Facebook/autoload.php');
require_once(CLASS_PATH.'/User.php');

$fb = new Facebook\Facebook([
  'app_id' => $config['facebook']['app_id'], // Replace {app-id} with your app id
  'app_secret' =>  $config['facebook']['app_secret'],
  'default_graph_version' => $config['facebook']['default_graph_version'],
  ]);

$helper = $fb->getRedirectLoginHelper();

if (isset($_GET['state'])) {
    $helper->getPersistentDataHandler()->set('state', $_GET['state']);
}

try {
  $accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

if (! isset($accessToken)) {
  if ($helper->getError()) {
    header('HTTP/1.0 401 Unauthorized');
    echo "Error: " . $helper->getError() . "\n";
    echo "Error Code: " . $helper->getErrorCode() . "\n";
    echo "Error Reason: " . $helper->getErrorReason() . "\n";
    echo "Error Description: " . $helper->getErrorDescription() . "\n";
  } else {
    header('HTTP/1.0 400 Bad Request');
    echo 'Bad request';
  }
  exit;
}

// Logged in
// echo '<h3>Access Token</h3>';
// var_dump($accessToken->getValue());

// The OAuth 2.0 client handler helps us manage access tokens
$oAuth2Client = $fb->getOAuth2Client();

// Get the access token metadata from /debug_token
$tokenMetadata = $oAuth2Client->debugToken($accessToken);
// echo '<h3>Metadata</h3>';
// var_dump($tokenMetadata);

// Validation (these will throw FacebookSDKException's when they fail)
$tokenMetadata->validateAppId($config['facebook']['app_id']); // Replace {app-id} with your app id
// If you know the user ID this access token belongs to, you can validate it here
//$tokenMetadata->validateUserId('123');
$tokenMetadata->validateExpiration();

if (! $accessToken->isLongLived()) {
  // Exchanges a short-lived access token for a long-lived one
  try {
    $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
  } catch (Facebook\Exceptions\FacebookSDKException $e) {
    echo "<p>Error getting long-lived access token: " . $helper->getMessage() . "</p>\n\n";
    exit;
  }

  echo '<h3>Long-lived</h3>';
  var_dump($accessToken->getValue());
}

$_SESSION['fb_access_token'] = (string) $accessToken;

// Getting user facebook profile info
try {
    $profileRequest = $fb->get('/me?fields=name,first_name,last_name,email,link,gender,locale,picture.width(80)', $accessToken->getValue());
    $fbUserProfile = $profileRequest->getGraphNode()->asArray();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
    echo 'Graph returned an error: ' . $e->getMessage();
    session_destroy();
    // Redirect user back to app login page
    header("Location: ./");
    exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}

// Initialize User class
$user = new User($config['db']);

// Insert or update user data to the database
$fbUserData = array(
    'oauth_provider'=> 'facebook',
    'oauth_uid'     => $fbUserProfile['id'],
    'first_name'    => $fbUserProfile['first_name'],
    'last_name'     => $fbUserProfile['last_name'],
    'email'         => $fbUserProfile['email'],
    'gender'        => $fbUserProfile['gender'],
    'locale'        => $fbUserProfile['locale'],
    'picture'       => $fbUserProfile['picture']['url'],
    'link'          => $fbUserProfile['link']
);
$userData = $user->checkUser($fbUserData);

// Put user data into session
$_SESSION['userData'] = $userData;

// User is logged in with a long-lived access token.
// You can redirect them to a members-only page.
header('Location: /reviews.php');
?>
