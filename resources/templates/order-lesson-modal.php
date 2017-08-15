<!-- Modal -->
<div class="modal fade" id="orderLesson" tabindex="-1" role="dialog" aria-labelledby="order lesson">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header gradient-reef">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <!-- <h4 class="modal-title" id="myModalLabel">Modal title</h4> -->

      <img
        src="../img/phone-call.png"
        alt="phone"
        id="modal-banner"
      >
      </div>
      <div class="modal-body">

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
         <!-- alert for information messsages -->

       <div id="message-alert" class="alert fade in">
        <a href="#" class="close" data-dismiss="alert">&times;</a>
        Сообщение успешно отправлено
      </div>

      <form id="orderLessonFrom">
        <fieldset>
          <div class="form-group">
          <label for="name" class="sr-only">Имя</label>
          <input type="text" class="form-control" id="name" name="name" placeholder="Имя">
          </div>

          <div class="form-group">
          <label for="email" class="sr-only">Email</label>
          <input type="email" class="form-control" id="email" name="email" placeholder="Email">
          </div>

          <div class="form-group">
          <label for="phone" class="sr-only">Телефон</label>
          <input type="text" data-toggle="tooltip" title="пример: 0506984388" class="form-control" id="phone" name="phone" placeholder="Телефон">
          </div>

          <button type="submit" class="btn btn-primary btn-block">Отправить</button>
         </fieldset>
      </form>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">закрыть</button>
      </div>
    </div>
  </div>
</div>
