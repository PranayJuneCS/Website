$(function() {

  /* START REAL JS */

  var $pages;
  var index;
  var pagePos;
  var down;
  var listen;
  var timestamp;
  var nextPage;

  /* HELPER METHODS */

  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() { // iPad not considered Mobile...
        return navigator.userAgent.match(/iPhone|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    },
    isPad: function() {
      return navigator.userAgent.match(/iPad/i);
    }
  };

  /* INITIAL IE CHECK */

  var $toastContent = $('<span>For the smoothest experience, consider using <a target="_blank" href="https://www.google.com/chrome/">Google Chrome</a>.</span>');
  if (!isMobile.any() && !isMobile.isPad() && !!document.documentMode) {
    // only show toast if user is on IE, and not on mobile or iPad
    Materialize.toast($toastContent, 4000, 'rounded');
  }

  var isPortrait = function() {
    return window.innerHeight > window.innerWidth;
  };

  /* END HELPER METHODS */

  /* SIDENAV METHODS */

  var openNav = function() {
    document.getElementById("mySidenav").style.width = "250px";
    $("#current-nav-page").text("MENU");
    navOpen = true;
    if (isMobile.any()) {
      $("#current-nav-page").removeClass("hide");
    }
  };

  var closeNav = function() {
    document.getElementById("mySidenav").style.width = "0";
    if (!nextPage) {
      $("#current-nav-page").text($(".sidenav a.active").text()); 
    } else {
      $("#current-nav-page").text(nextPage);
      nextPage = null;
    }
    navOpen = false;
    if (isMobile.any()) {
      $("#current-nav-page").addClass("hide");
    }
  };

  var toggleNav = function() {
    if (navOpen) {
      closeNav();
    } else {
      openNav();
    }
  };

  /* END SIDENAV METHODS */

  /* SCROLL METHODS */

  var refreshIndex = function(page) {
    switch (page) {
      case "HOME":
        index = 0;
        break;
      case "ABOUT":
        index = 1;
        break;
      case "PROJECTS":
        index = 2;
        break;
      case "STUFF":
        index = 3;
        break;
      default:
        index = 0;
    }
  }

  /* END SCROLL METHODS */

  /************** BEGIN LOGIC **************/

  /* SIDEBAR JQUERY */

  $("#logo-container img, .hover-menu").mouseover(function() {
    if (!isMobile.any()) {
      openNav();
    }
  });

  $("#logo-container img").on('click', function() {
    if (isMobile.any() || isMobile.isPad()) {
      toggleNav();
    }
  });

  $(".closebtn").on('click', function() {
    closeNav();
  });

  $("#mySidenav").mouseleave(function() {
    closeNav();
  });

  $(".full-screen").on('click', function() {
    if (isMobile.any() || isMobile.isPad()) {
      if (navOpen) {
        closeNav();
      }
    }
  });

  $(".sidebar-link").click(function(e) {
    let href = $(e.currentTarget).attr('href');
    nextPage = href.split("-")[1].toUpperCase();
    refreshIndex(nextPage);
    if (isMobile.any() || isMobile.isPad()) {
      if (navOpen) {
        closeNav();
      }
    }
  });

  /* END SIDEBAR JQUERY */

  /* ARROW JQUERY */

  $(".go-to-contact").click(function(e) {
    e.preventDefault();
    $.scrollTo($("#page-contact"), 600);
    index += 1;
  });

  $("a.next-arrow").click(function(e) {
    let href = $(e.currentTarget).attr('href');
    $("#current-nav-page").text(href.split("-")[1].toUpperCase());
    index += 1;
  });

  $(".arrow-color").click(function(e) {
    index = 0;
    $("#current-nav-page").text("HOME");
  });

  /* END ARROW JQUERY */

  /* SCROLL JQUERY */

  var ar = new Array(32, 33, 34, 35, 36, 37, 38, 39, 40);

  $(document).keydown(function (e) {
    var key = e.which;
    if ($.inArray(key, ar) > -1) {
      e.preventDefault();
      if (key == 32) { // space bar
        if (!navOpen) {
          if (index < 3) {
            $($(".next-arrow")[index]).click();
          } else {
            $(".go-to-contact").click();
          }
        }
      }
      return false;
    }
    return true;
  });

  $pages = $(".full-screen");
  pagePos = 0;
  down = 0;
  listen = true;
  index = 0;
  timestamp = undefined;

  $('html, body').on('DOMMouseScroll mousewheel', function(e) {
    e.preventDefault();

    if (!listen || navOpen || ($("#lightboxOverlay").css('display') != "none")) {
      return;
    }

    let newTimeStamp = e.originalEvent.timeStamp;
    if (!e.originalEvent.deltaY && timestamp && newTimeStamp < (timestamp + 1300)) { // firefox
      return;
    }

    listen = false;
    if (e.originalEvent.deltaY && Math.abs(e.originalEvent.deltaY) < 20) { // not enough scroll
      listen = true;
      return false;
    }

    timestamp = newTimeStamp;

    let delta;
    if (e.originalEvent.deltaY) {
      delta = e.originalEvent.deltaY;
    } else {
      delta = e.originalEvent.detail;
    }
    down = delta > 0;
    index = Math.min(Math.max(0, down ? ++index : --index), $pages.length - 1);
    pagePos = $pages.eq(index).offset().top;

    let pageId = $pages[index].id;
    $(this).stop();
    $.scrollTo($("#" + pageId), 800, {
      onAfter: function() {
        listen = true;
        if (!pageId.match(/contact/i)) {
          $("#current-nav-page").text(pageId.split("-")[1].toUpperCase());
        }
      }
    });
  });

  /* END SCROLL JQUERY */

  /* SPECIAL MOBILE/iOS CASES */

  if (isMobile.any() || isMobile.isPad()) {
    $('a#mail-to').attr('href', 'mailto:pkr2100@gmail.com');
  }

  if (isMobile.any()) {
    $("#current-nav-page").addClass("hide");
  }

  if (isMobile.any() || isMobile.isPad()) {
    $('.material-tooltip').addClass("hide");
  }

  if (!isMobile.any()) {
    $('.about-me-header').addClass("hide");
  }

  /* END SPECIAL CASES */

  /* SLICK SLIDER JQUERY */

  $(".about-container").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    dots: true,
    adaptiveHeight: true
  });
  
  $('.slider-for').slick({
    slidesToShow: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '60px',
    speed: 300,
    infinite: true,
    dots: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '35px',
          speed: 300,
          infinite: true,
          dots: false,
          adaptiveHeight: true
        }
      }
    ]
  });

  $('.info-cards').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    dots: true,
    infinite: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '45px',
          focusOnSelect: true,
          speed: 300,
          infinite: true,
          dots: false,
          adaptiveHeight: true,
          fade: false
        }
      }
    ]
  });

  /* END SLICK SLIDER JQUERY */

  /* INITIALIZATION/EXECUTION */

  window.onbeforeunload = function() {
    window.scrollTo(0, 0);
  }

  let navOpen = false;

  $('.scrollspy').scrollSpy({
    scrollOffset: 1
  });

  $("#typed").typed({
    stringsElement: $('#typed-strings'),
    startDelay: 800,
    typeSpeed: 50,
    showCursor: false,
    backSpeed: 30,
    callback: function() {
      $(".intro, .home-line-break, .home-info").removeClass("hide").addClass("fadeIn");
    }
  });

});
