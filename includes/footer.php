    <footer>
      <small><?=date("Y")?> - <?=$infoGnrl->field_bi_copy_footer?></small>
      <a href="https://bogotadc.travel/">Ir a bogotadc.travel</a>
    </footer>
    <div id="preloader">
    <div class="image"><img src="img/preloader.gif" alt="preloader"></div>
</div>
    <script src="../js/jquery-1.12.4.min.js"></script>
    <script src="../js/jquery-ui.min.js"></script>
    <script src="../js/jquery.validate.min.js"></script>
    <script src="../js/jquery.form.js"></script>
    <script src="../js/additional-methods.min.js"></script>
    <script src="../js/jquery.fancybox.min.js"></script>
    <script src="../js/cookie.js"></script>
    <script src="js/lazyimages.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>
    <script src="js/splide.min.js"></script>
    <script src="js/main.js?v=<?=time();?>"></script>
    <script>
      if(document.querySelector('.splide_lastphotos')){

      new Splide(".splide_lastphotos", {
        type: "loop",
        padding: { right: 50 },
        arrows: false,
        pagination: false,
        autoplay: true,
        fixedWidth: 320,
        gap: 8,
        fixedHeight: 320,
      }).mount();
      }
      if(document.querySelector('.splide_lastphotos')){

      new Splide(".splide_downloaded", {
        type: "loop",
        padding: { right: 50 },
        arrows: false,
        pagination: false,
        autoplay: true,
        fixedWidth: 320,
        gap: 8,
        fixedHeight: 320,
      }).mount();
      }
    </script>
  </body>
</html>
