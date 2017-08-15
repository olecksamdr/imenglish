<?php
  if(!session_id()) {
      session_start();
  }
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <link rel="stylesheet" href="css/vendor/bootstrap.min.css">
  <link rel="stylesheet" href="css/reviews.css">
  <title>отзывы | I. M.</title>

  <meta name="description" content="Отзывы людей, которые изучали английский вместе с нами." />
  <!-- for facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="http://imenglish.com.ua">
  <meta property="og:title" content="Английский по skype | I.M.">
  <meta property="og:description" content="Отзывы людей, которые изучали английский вместе с нами.">
  <meta property="og:image" content="http://imenglish.com.ua/img/im.png">
</head>
<body>
  <!-- Modal -->
  <?php
    require_once('resources/config.php');
    require_once(TEMPLATES_PATH.'/order-lesson-modal.php');
   ?>

  <!-- include navigation -->
  <?php
    require_once(TEMPLATES_PATH.'/navigation.php');
   ?>

  <section id="reviews">
    <div class="container">
     <div class="text-center">
      <div class="section-title">
        <img src="img/good-review.png" alt="палец вверх">
        <h2 class="reviews">
          отзывы
        </h2>
      </div>
     </div>
     <?php if ( !isset($_SESSION['userData']) ): ?>
       <div class="login-fb-container">
         <h3>
           Для того чтобы оставить комментарий войдите с помощью facebook
         </h3>
         <?php require_once('login_facebook.php') ?>
         <a href="<?= $facebookLoginUrl; ?>" class="btn" id="login-fb-btn">войти</a>
       </div>
     <?php endif; ?>

     <!-- oly loged in user can write a review -->
    <?php if ( isset($_SESSION['userData']) ): ?>
      <form id="review-form">
        <div
          name="review-message"
          id="review-textarea"
          cols="30"
          rows="10"
          class="form-control"
          contenteditable
          data-picture="<?= $_SESSION['userData']['picture'] ?>"
          data-firstname="<?= $_SESSION['userData']['first_name'] ?>"
          data-lastname="<?= $_SESSION['userData']['last_name'] ?>"
          data-userid="<?= $_SESSION['userData']['id'] ?>"
          >
          <span class="placeholder">ваш отзыв ...</span>
        </div>

        <!-- for showing reviews error -->
        <div id="review-error" class="alert alert-danger"></div>

        <div href="#" class="btn" id="send-review">
          <a href="#" class="btn" id="send-review-btn">оставить отзыв</a>
          <!-- loader -->
          <div class="sk-circle">
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
          </div>
        </div>
      </form>
    <?php endif; ?>

     <div class="row" id="reviews-msg-container">
       <?php
         // display all review messages from DB

         function makeLeftMessage($avatarURL, $first_name, $last_name, $text) {
           $html = '<div class="message message-left">';
           $html .=       '<div class="avatar"><img src="'. $avatarURL .'" alt="user picture"></div>';
           $html .=        '<div class="message-content">';
           $html .=           '<p class="thumbnail">';
           $html .=              '<span class="author">'.$first_name.' '.$last_name.'</span>';
           $html .=                 $text;
           $html .=            '</p>';
           $html .=         '</div>';
           $html .=     '</div>';

           echo $html;
         }

         function makeRightMessage($avatarURL, $first_name, $last_name, $text) {
           $html = '<div class="message message-right">';
           $html .=        '<div class="message-content">';
           $html .=           '<p class="thumbnail">';
           $html .=              '<span class="author">'.$first_name.' '.$last_name.'</span>';
           $html .=                 $text;
           $html .=            '</p>';
           $html .=         '</div>';
           $html .=       '<div class="avatar"><img src="'. $avatarURL .'" alt="user picture"></div>';
           $html .=     '</div>';

           echo $html;
         }

         require_once('resources/config.php');

         $conn = new mysqli( $config['db']['host'],
                             $config['db']['username'],
                             $config['db']['password'],
                             $config['db']['name']
                           );
         $query = 'SELECT usr.first_name, usr.last_name, usr.picture, msg.text FROM `messages` as msg INNER JOIN `users` as usr on msg.user_id = usr.id WHERE msg.approved = 1 ORDER BY msg.created desc';
         $result = $conn->query($query);

         if($result->num_rows > 0) {
           $i = 0;
           while($row = $result->fetch_assoc()) {
             if ($i % 2 == 0)
               makeLeftMessage($row['picture'], $row['first_name'], $row['last_name'], $row['text']);
             else
               makeRightMessage($row['picture'], $row['first_name'], $row['last_name'], $row['text']);

            $i++;
           }
         } else {
           echo '<div class="zero-message message message-left">';
           echo   '<div class="avatar">';
           echo     '<img src="img/goofy.svg" alt="smailing icon">';
           echo    '</div>';
           echo    '<div class="message-content">';
           echo     '<p class="thumbnail">';
           echo         '<span class="author">imenglish.com.ua</span>';
           echo       'отзывов нет';
           echo     '</p>';
           echo    '</div>';
           echo '</div>';
         }
       ?>
     </div> <!-- /reviews-msg-container -->
   </div> <!-- /container -->
  </section>

  <footer>
    <div class="container">
      <div class="row">
        <div class="text-center">
          <div>Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </div> <!-- /col -->
      </div> <!-- /row -->
    </div> <!-- /container -->
  </footer>

  <script src="js/vendor/jquery-3.2.1.min.js"></script>
  <script src="js/vendor/jquery.validate.min.js"></script>
  <script src="js/vendor/bootstrap.min.js"></script>
  <script src="js/reviews.js"></script>
  <script src="js/orderLessonValidation.js" type="text/javascript">

  <?php
    // include google analytics script
    include_once(TEMPLATES_PATH."/analyticstracking.php");
  ?>
</body>
</html>
