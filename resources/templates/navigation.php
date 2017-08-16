<?php
  require_once(__DIR__.'/../config.php');

 if(!session_id()) {
    session_start();
}
?>
<!-- <div class="contacts">
  <div class="container">
    <span>Skype: imenglish@gmail.com</span>
    <span>Телефон: 0678473060</span>
  </div>
</div> -->

<nav class="navbar navbar-fixed-top">
<div class="container">

  <div class="navbar-header">
    <button
      type="button"
      class="btn btn-lg btn-default navbar-btn"
      data-toggle="modal"
      data-target="#orderLesson"
      id="orderLessonBtn"
      >
      заказать бесплатный урок
      </button>

    <button type="button" class="navbar-toggle collapsed navbar-right" data-toggle="collapse" data-target="#navbarCollapse" aria-expanded="false">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    </button>
  </div>

  <div class="collapse navbar-collapse" id="navbarCollapse">
    <ul class="nav navbar-nav">
      <li class="active"><a href="/#courses">курсы<span class="sr-only">(current)</span></a></li>
      <li><a href="/#prices">цены</a></li>
      <li><a href="/reviews.php">отзывы</a></li>

      <?php if ( isset($_SESSION['userData']) ): ?>
        <?php if ( $_SESSION['userData']['oauth_uid'] === $config['admin']['oauth_uid'] ): ?>
          <li><a href="/administration/manage-reviews.php">управление отзывами</a></li>
        <?php endif; ?>
      <?php endif; ?>

    </ul>

    <p class="navbar-text navbar-right contacts">
      <b class="skype">
        <img src="img/skype-icon.png" alt="skype icon">
        imenglish@gmail.com
      </b>
      <b class="phone">
        <img src="img/smartphone.png" alt="smartphone icon">
        +380678473060
      </b>
    </p>

    <?php if ( isset($_SESSION['userData']) ): ?>
      <button class="btn btn-default navbar-btn pull-right" id="btn-logout">выйти</dutton>
    <?php endif; ?>
  </div>
</nav>
