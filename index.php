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
  <title>английский по скайпу | I.M.</title>

  <meta name="description" content="Английский по Skype! Разговорная практика, индивидуальные занятия, подготовка к ЗНО и международным экзаменам, гибкая система скидок, удобный график. Изучайте Английский вместе с нами!" />
  <!-- for facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="http://imenglish.com.ua">
  <meta property="og:title" content="Английский по skype | I.M.">
  <meta property="og:description" content="Английский по Skype! Разговорная практика, индивидуальные занятия, подготовка к ЗНО и международным экзаменам, гибкая система скидок, удобный график. Изучайте Английский вместе с нами!">
  <meta property="og:image" content="http://imenglish.com.ua/img/im.png">

  <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
  <link rel="shortcut icon" type="image/png" href="/favicon.png"/>

  <link rel="stylesheet" href="css/vendor/bootstrap.min.css">
  <link rel="stylesheet" href="css/vendor/animate.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

	<!-- Modal -->
  <?php
    require_once('resources/config.php');
    require_once(TEMPLATES_PATH.'/order-lesson-modal.php');
   ?>

  <header id="workspace">

  <!-- include navigation -->
  <?php
  require_once(TEMPLATES_PATH.'/navigation.php');
  ?>

  <div class="container" >


        <!-- <div id="workspace-title" class="visible-xs">
          <h1>уроки английского по скайпу</h1>
        </div> -->

        <div class="advertising hidden-xs">
          <p>
            Зарегистрируйтесь <b>до 1 сентября</b> и получите <b>2 урока в подарок</b>
          </p>
        </div>  <!-- advertising -->

          <div class="main-description">
            <h3>Почему мы?<br> Потому что у нас:</h3>
            <ul>
              <li>опытные преподаватели,</li>
              <li>гибкая система скидок,</li>
              <li>акцент на уроках на разговорной практике,</li>
              <li>лучшая подготовка к IELTS, TOEFL, ЗНО,</li>
              <li>бесплатные учебные материалы,</li>
              <li>удобный график занятий,</li>
              <li>и просто дружеская атмосфера на уроках</li>
            </ul>
          </div> <!-- /main-description -->

          <div class="computer">
            <img src="img/computer.svg" alt="компьютер" class="computer-icon">
            <img src="img/computer-glass.svg" alt="блик компьютерного стекла" class="computer-glass">

            <div class="on-screen visible-xs">
              <p>
                Зарегистрируйтесь <b>до 1 сентября</b> и получите <b>2 урока в подарок</b>
              </p>
            </div>  <!-- advertising -->

            <div class="skype-wrapper hidden-xs">
              <img src="img/skype.svg" alt="иконка скайп" class="skype-icon">

              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>

            <div class="computer-text hidden-xs">
              <h1>
                <span>уроки</span><br>
                <span>английского</span><br>
                <span>по скайпу</span>
              </h1>
            </div>
            <img src="img/cup.svg" alt="кружка" class="cup hidden-xs hidden-md">
          </div> <!-- /computer -->
        <img src="img/globe.svg" alt="глобус" class="globe hidden-sm hidden-xs">
    </div> <!-- container -->
  </header> <!-- /workspace -->
  <section id="courses">
	  <div class="container">
		 <div class="text-center">
			<div class="section-title">
				<img src="img/test.png" alt="лист бумаги и карандаш">
				<h2 >
					Готовим к международным экзаменам и ЗНО
				</h2>
			</div>
		 </div>

		<div class="row">

		<div class="col-sm-6 col-md-4 wp2">
			<div class="thumbnail">
			  <div class="banner text-center toefl">
				<h3>TOEFL</h3>
			  </div>
			  <div class="caption">
				<h3>Test of English as a Foreign Language</h3>
				<p>
					Тест на знание английского языка как иностранного — стандартизованный тест на знание английского языка
					(в его североамериканском варианте), сдача которого обязательна для неанглоязычных иностранцев
					для поступления в вузы США и Канады, а также Европы и Азии
				</p>
			  </div>
			</div>
		  </div>

		  <div class="col-sm-6 col-md-4 wp2 delay-05s">
			<div class="thumbnail">
			  <div class="banner text-center ielts">
				<h3>IELTS</h3>
			  </div>
			  <div class="caption">
				<h3>International English Language Testing System</h3>
				<p>Международная система оценки знания английского языка</p>
			  </div>
			</div>
		  </div>

		  <div class="clearfix visible-sm"></div>

		  <div class="col-sm-6 col-md-4 wp2 delay-1s">
			<div class="thumbnail">
			  <div class="banner text-center cae">
				<h3>CAE</h3>
			  </div>
			  <div class="caption">
				<h3>Certificate in advanced English</h3>
				<p>
					Экзамен по английскому языку,
					разработанный и проводящийся подразделением ESOL (English for Speakers of Other Languages)
					Кембриджского университета. Разработан и впервые представлен в 1991 году.
					Сертификат соответствует уровню C1 Шкалы Совета Европы
				</p>
			  </div>
			</div>
		  </div>

		  <div class="clearfix visible-md visible-lg">
			<!-- clearfix xs cols every 2 -->
		  </div>

		  <div class="col-sm-6 col-md-4 wp2 delay-2s">
			<div class="thumbnail">
			  <div class="banner text-center zno">
				<h3>ЗНО</h3>
			  </div>
			  <div class="caption">
				<h3>Подготовка к ЗНО</h3>
				<!-- <p>...</p> -->
			  </div>
			</div>
		  </div>

		</div>
	  </div>
  </section>

  <section id="prices">
	<!-- <div class="gradient-border"></div> -->

	<div class="container">
		 <div class="text-center">
			<div class="section-title">
				<img src="img/price.png" alt="иконка цена">
				<h2 >
					Цены за 60 минут
				</h2>
			</div>
		 </div>

		<div class="row" id="price-wrapper">
			<div class="col-md-6">
				<div class="price-info">
					 <img src="img/alphabet.png" alt="иконка алфавит">
					 <h3 class="text-center">Общий курс (A1-B1)</h3>

					  <ul class="list-group">
						<li class="list-group-item">При оплате за 24 занятия - 150 грн. за занятие</li>
						<li class="list-group-item">При оплате за 8 занятий - 170 грн. за занятие</li>
						<li class="list-group-item">При оплате за 2 занятия - 180 грн. за занятие</li>
					  </ul>
				</div> <!-- /price-info -->
			</div> <!-- /col -->
			<div class="col-md-6">
				<div class="price-info">
					<img src="img/diploma.png" alt="иконка диплом">
					<h3 class="text-center">Общий курс B2-C2, подготовка к международным экзаменам</h3>
					<ul class="list-group">
					  <li class="list-group-item">При оплате за 24 занятия - 160 грн. за занятие</li>
					  <li class="list-group-item">При оплате за 8 занятий - 180 грн. за занятие</li>
					  <li class="list-group-item">При оплате за 2 занятия - 200 грн. за занятие</li>
					</ul>
				</div>
			</div> <!-- /col -->
		</div> <!-- /row -->
    <div class="text-center">
      <button
        type="button"
        class="btn btn-lg btn-primary"
        data-toggle="modal"
        data-target="#orderLesson"
        id="orderLessonBtn2"
        >
        заказать бесплатный урок
        </button>
    </div> <!-- /text-center -->
	</div>
  </section>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="freepik">
            <a href="http://www.freepik.com/free-vector/workspace-with-a-computer_796697.htm#term=workspace&page=1&position=15">Workspace with a computer image</a> designed by
            <a href="http://www.freepik.com/">
              <img src="img/freepik-logo.png" alt="freepik website logo">
            </a>
          </div>
          <div class="flaticon">Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </div> <!-- /col -->
        <div class="col-sm-6">
          Ссылки на использованные иконки:
          <ul>
            <li>
              <a href="https://www.flaticon.com/free-icon/bricks_308199#term=alphabet&page=1&position=14">Alphabet</a>
            </li>
            <li>
              <a href="https://www.flaticon.com/free-icon/diploma_167749#term=diploma&page=1&position=8">Diploma</a>
            </li>
            <li>
              <a href="https://www.flaticon.com/free-icon/tag_242671">Price</a>
            </li>
            <li>
              <a href="https://www.flaticon.com/free-icon/phone-call_139005#term=telephone call&page=1&position=23">Telephone</a>
            </li>
          </ul>
        </div> <!-- /col -->
      </div> <!-- /row -->
    </div> <!-- /container -->
  </footer>

  <script src="js/vendor/jquery-3.2.1.min.js"></script>
  <script src="js/vendor/jquery.validate.min.js"></script>
  <script src="js/vendor/jquery.waypoints.min.js"></script>
  <script src="js/vendor/bootstrap.min.js"></script>
  <script src="js/scripts.js"></script>
  <script src="js/orderLessonValidation.js" type="text/javascript">

  </script>

  <!-- flexbox for old browsers -->
  <script type="text/javascript" src="js/vendor/flexibility.js"></script>

  <?php
    // include google analytics script
    include_once(TEMPLATES_PATH."/analyticstracking.php");
  ?>
</body>
</html>
