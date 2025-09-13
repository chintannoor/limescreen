(function ($) {
  "use strict";
  $(document).on("ready", function () {
    jQuery(window).on("scroll", function () {
      if ($(this).scrollTop() > 200) {
        $(".header").addClass("sticky");
      } else {
        $(".header").removeClass("sticky");
      }
    });
    // $(".mobile-menu").slicknav({
    //   prependTo: ".mobile-nav",
    //   label: "",
    //   duration: 500,
    //   easingOpen: "easeOutBounce",
    // });
    // $(".hero-slider").owlCarousel({
    //   items: 1,
    //   autoplay: true,
    //   loop: true,
    //   autoplayTimeout: 4000,
    //   autoplayHoverPause: false,
    //   smartSpeed: 700,
    //   merge: true,
    //   nav: false,
    //   dots: true,
    // });
    // $(".blog-slider").owlCarousel({
    //   items: 3,
    //   autoplay: true,
    //   loop: true,
    //   margin: 30,
    //   autoplayTimeout: 3500,
    //   autoplayHoverPause: false,
    //   smartSpeed: 600,
    //   merge: true,
    //   nav: true,
    //   navText: [
    //     '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    //     '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    //   ],
    //   dots: false,
    //   responsive: {
    //     300: { items: 1 },
    //     480: { items: 1 },
    //     768: { items: 2 },
    //     1170: { items: 3 },
    //   },
    // });
    // $(".testimnial-slider").owlCarousel({
    //   items: 1,
    //   autoplay: true,
    //   loop: true,
    //   autoplayTimeout: 3500,
    //   autoplayHoverPause: false,
    //   smartSpeed: 600,
    //   merge: true,
    //   nav: false,
    //   dots: true,
    // });
    $("#portfolio-item").cubeportfolio({
      filters: "#portfolio-nav",
      loadMoreAction: "click",
      defaultFilter: "*",
      layoutMode: "grid",
      animationType: "quicksand",
      gridAdjustment: "responsive",
      gapHorizontal: 30,
      gapVertical: 30,
      mediaQueries: [
        { width: 1100, cols: 3 },
        { width: 768, cols: 3 },
        { width: 480, cols: 2 },
        { width: 0, cols: 1 },
      ],
      caption: "overlayBottomPush",
      displayType: "sequentially",
      displayTypeSpeed: 80,
    });
    // $(".client-slider").owlCarousel({
    //   items: 4,
    //   autoplay: true,
    //   loop: true,
    //   margin: 15,
    //   autoplayTimeout: 4000,
    //   autoplayHoverPause: false,
    //   smartSpeed: 1000,
    //   merge: true,
    //   nav: true,
    //   navText: [
    //     '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    //     '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    //   ],
    //   dots: false,
    //   responsive: {
    //     300: { items: 2 },
    //     480: { items: 2 },
    //     768: { items: 3 },
    //     1170: { items: 4 },
    //   },
    // });
    $(".video-popup").magnificPopup({
      type: "iframe",
      removalDelay: 300,
      mainClass: "mfp-fade",
    });
    $(window).stellar({
      responsive: true,
      positionProperty: "position",
      horizontalScrolling: false,
    });
    var window_width = $(window).width();
    if (window_width > 767) {
      new WOW().init();
    }
    $.scrollUp({
      scrollName: "scrollUp",
      scrollDistance: 500,
      scrollFrom: "top",
      scrollSpeed: 1000,
      animation: "fade",
      animationSpeed: 50,
      scrollTrigger: false,
      scrollTarget: false,
      easing: "easeInOut",
      scrollText: ["<i class='fa fa-angle-up'></i>"],
      scrollTitle: false,
      scrollImg: false,
      activeOverlay: false,
      zIndex: 2147483647,
    });
    $(".p-anim-btn").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          { scrollTop: $($anchor.attr("href")).offset().top - 80 },
          1000,
          "easeInOutQuart"
        );
      event.preventDefault();
    });
  });
  var prealoaderOption = $(window);
  prealoaderOption.on("load", function () {
    var preloader = jQuery(".sk-cube-grid");
    var preloaderArea = jQuery(".preloader-area");
    preloader.fadeOut();
    preloaderArea.delay(350).fadeOut("slow");
  });
  // $(".team-slider").owlCarousel({
  //   items: 4,
  //   autoplay: true,
  //   loop: true,
  //   autoplayTimeout: 3500,
  //   autoplayHoverPause: false,
  //   smartSpeed: 600,
  //   merge: true,
  //   margin: 30,
  //   nav: true,
  //   navText: [
  //     '<i class="fa fa-angle-left" aria-hidden="true"></i>',
  //     '<i class="fa fa-angle-right" aria-hidden="true"></i>',
  //   ],
  //   dots: false,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     544: {
  //       items: 1,
  //     },
  //     768: {
  //       items: 2,
  //     },
  //     992: {
  //       items: 3,
  //     },
  //     1200: {
  //       items: 4,
  //     },
  //   },
  // });
  // $(".video-slider").owlCarousel({
  //   items: 4,
  //   autoplay: false,
  //   loop: true,
  //   autoplayTimeout: 3500,
  //   autoplayHoverPause: false,
  //   smartSpeed: 600,
  //   merge: true,
  //   margin: 30,
  //   nav: true,
  //   navText: [
  //     '<i class="fa fa-angle-left" aria-hidden="true"></i>',
  //     '<i class="fa fa-angle-right" aria-hidden="true"></i>',
  //   ],
  //   dots: false,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     544: {
  //       items: 1,
  //     },
  //     768: {
  //       items: 2,
  //     },
  //     992: {
  //       items: 3,
  //     },
  //     1200: {
  //       items: 4,
  //     },
  //   },
  // });
})(jQuery);
