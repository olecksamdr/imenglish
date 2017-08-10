<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>english lessons | I.M.</title>

  <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
  <link rel="shortcut icon" type="image/png" href="/favicon.png"/>

  <link rel="stylesheet" href="../css/vendor/bootstrap.min.css">
  <link rel="stylesheet" href="../css/manage-reviews.css">
</head>
<body>

	<!-- Modal -->
  <?php
    require_once('../resources/config.php');
    require_once(TEMPLATES_PATH.'/order-lesson-modal.php');
   ?>

  <!-- include navigation -->
  <?php
    require_once(TEMPLATES_PATH.'/navigation.php');
   ?>

  <section id="manage-reviews">
	  <div class="container">
		 <div class="text-center">
			<div class="section-title">
				<img src="../img/test.svg" alt="pass test icon">
				<h2 >
					Управление отзывами
				</h2>
			</div>
		 </div>

    <div class="controls">
      <div class="btn-group" role="group" aria-label="controls" id="control-buttons">
        <button type="button" class="btn btn-default" id="select-all-btn">
          <span class="glyphicon glyphicon-th-large"></span>
          выделить все
        </button>
        <button type="button" class="btn btn-default" id="delete-btn" disabled>
          <span class="glyphicon glyphicon-trash"></span>
          удалить
        </button>
        <button type="button" class="btn btn-default" id="confirm-btn" disabled>
          <span class="glyphicon glyphicon-ok"></span>
          Подтвердить
        </button>
      </div>

      <div class="tabs">
         <ul class="nav nav-tabs">
           <li class="active">
             <a href="#not-confirmed" data-toggle="tab" aria-controls="not-confirmed">
               Не подтверждены <span class="badge">0</span>
             </a>
           </li>
           <li>
             <a href="#confirmed" data-toggle="tab" aria-controls="confirmed">
               Подтверждены <span class="badge">0</span>
             </a>
           </li>
           <li>
             <a href="#all" data-toggle="tab" aria-controls="all">
               Все <span class="badge">0</span>
             </a>
           </li>
         </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane fade active clearfix" id="not-confirmed">

            <div class="zero-message message message-left">

              <div class="checkbox-wrapper">
                  <input type="checkbox" id="select-message" value="">
                  <label for="select-message"></label>
              </div> <!-- /checkbox-wrapper -->

              <div class="avatar">
                <img src="../img/goofy.svg" alt="smailing icon">
               </div>
               <div class="message-content">
                <p class="thumbnail">
                    <span class="author">imenglish.com.ua</span>
                  отзывов нет
                </p>
               </div>
            </div>

          </div> <!-- /tab-pane -->

          <div role="tabpanel" class="tab-pane fade clearfix" id="confirmed">
          </div>

          <div role="tabpanel" class="tab-pane fade clearfix" id="all">
          </div>

        </div> <!-- /tab-content -->
      </div> <!-- /tabs -->
    </div> <!-- /controls -->
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

  <script src="../js/vendor/jquery-3.2.1.min.js"></script>
  <script src="../js/vendor/jquery.validate.min.js"></script>
  <script src="../js/vendor/jquery.waypoints.min.js"></script>
  <script src="../js/vendor/bootstrap.min.js"></script>
  <script src="../js/manage-reviews.js"></script>
</body>
</html>
