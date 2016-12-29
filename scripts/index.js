$(function() {

  let programmedScrolling = false;

  var $mobile_pages;
  var mobile_index;
  var mobile_pagePos;
  var mobile_up;
  var mobile_listen;
  var $pages;
  var index;
  var pagePos;
  var down;
  var listen;

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  let navOpen = false;
  
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

  var isPortrait = () => {
    return window.innerHeight > window.innerWidth;
  };

  var openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    $("#current-nav-page").text("MENU");
    $("#current-nav-page").addClass("color-white");
    navOpen = true;
    if (isMobile.any()) {
      $("#current-nav-page").removeClass("hide");
    }
    if (isMobile.iOS()) {
      setActivePageIOS();
    }
  };

  var closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    console.log("AH");
    $("#current-nav-page").text($(".sidenav a.active").text());
    $("#current-nav-page").removeClass("color-white");
    navOpen = false;
    if (isMobile.any()) {
      $("#current-nav-page").addClass("hide");
    }
  };

  var toggleNav = () => {
    if (navOpen) {
      closeNav();
    } else {
      openNav();
    }
  };

  var refreshIndex = (page) => {
    switch (page) {
      case "HOME":
        index = 0;
        mobile_index = 0;
        break;
      case "ABOUT":
        index = 1;
        mobile_index = 1;
        break;
      case "PROJECTS":
        index = 2;
        mobile_index = 2;
        break;
      case "STUFF":
        index = 3;
        mobile_index = 3;
        break;
      default:
        index = 0;
        mobile_index = 0;
    }
  }

  /* BEGINNING OF JQUERY/LOGIC */

  $('.your-class').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
  ]
  });

  if (isMobile.any()) {
    $("#current-nav-page").addClass("hide");
    if (isMobile.iOS()) {
      $(".next-arrow").addClass("hide");
    }
  }

  $("#logo-container img, .hover-menu").mouseover(() => {
    if (!isMobile.any()) {
      openNav();
    }
  });

  $("#logo-container img").on('click', () => {
    if (isMobile.any() || isMobile.isPad()) {
      toggleNav();
    }
  });

  $(".closebtn").on('click', () => {
    closeNav();
  });

  $("#mySidenav").mouseleave(() => {
    closeNav();
  });

  $(".full-screen").on('click', () => {
    if (isMobile.any() || isMobile.isPad()) {
      if (navOpen) {
        closeNav();
      }
    }
  });

  $(".sidebar-link").click((e) => {
    let href = $(e.currentTarget).attr('href');
    refreshIndex(href.split("-")[1].toUpperCase());
  });

  $(".go-to-contact").click((e) => {
    e.preventDefault();
    $.scrollTo($("#page-contact"), 600);
    index += 1;
    mobile_index += 1;
  });

  // $mobile_pages = $(".full-screen");
  // mobile_pagePos = 0;
  // mobile_up = 0;
  // mobile_listen = true;

  // if (isMobile.iOS()) {

  // } else {
  //   $('html, body').swipe({
  //     swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
  //       event.preventDefault();

  //       if(!mobile_listen || navOpen) {
  //         return;
  //       }
        
  //       mobile_listen = false;
  //       if (duration <= 100 || !["down", "up"].includes(direction)) { // not enough swipe
  //         mobile_listen = true;
  //         return false;
  //       }
  //       mobile_up = direction != "down";
  //       mobile_index = Math.min(Math.max(0, mobile_up ? ++mobile_index : --mobile_index), $mobile_pages.length - 1);
  //       mobile_pagePos = $mobile_pages.eq(mobile_index).offset().top;

  //       let pageId = $mobile_pages[mobile_index].id.split("-")[1];
  //       $(this).stop();
  //       if (window.location.hash == ("#" + pageId)) {
  //         mobile_listen = true;
  //         return;
  //       }
  //       window.location.hash = "#" + pageId;
  //     }
  //   });
  // }

  $pages = $(".full-screen");
  pagePos = 0;
  down = 0;
  listen = true;
  index = 0;

  var ar = new Array(32, 33, 34, 35, 36, 37, 38, 39, 40);

  $(document).keydown(function (e) {
    var key = e.which;
    if ($.inArray(key, ar) > -1) {
      e.preventDefault();
      return false;
    }
    return true;
  });


  $('html, body').on('DOMMouseScroll mousewheel', function(e) {
    e.preventDefault();

    if(!listen || navOpen) {
      return;
    }
    
    listen = false;
    if (Math.abs(e.originalEvent.deltaY) < 20) { // not enough scroll
      listen = true;
      return false;
    }
    down = e.originalEvent.deltaY > 0;
    index = Math.min(Math.max(0, down ? ++index : --index), $pages.length - 1);
    pagePos = $pages.eq(index).offset().top;

    let pageId = $pages[index].id;
    $(this).stop();
    $.scrollTo($("#" + pageId), 800, {
      onAfter: function() {
        listen = true;
        mobile_listen = true;
        if (!pageId.match(/contact/i)) {
          $("#current-nav-page").text(pageId.split("-")[1].toUpperCase());
        }
      }
    });
  });

  var $toastContent = $('<span>For the smoothest experience, consider using <a target="_blank" href="https://www.google.com/chrome/">Google Chrome</a>.</span>');
  if (!isMobile.any() && !isMobile.isPad() && !(!!window.chrome && !!window.chrome.webstore)) {
    // only show toast if not mobile, iPad, or Chrome, AND user is on home page
    if (index == 0) {
      Materialize.toast($toastContent, 3000, 'rounded');
    }
  }

  $('.scrollspy').scrollSpy({
    scrollOffset: 1
  });

  $("#typed").typed({
    stringsElement: $('#typed-strings'),
    startDelay: 800,
    typeSpeed: 50,
    showCursor: false,
    backSpeed: 30,
    callback: () => {
      $(".intro, .home-line-break, .home-info").removeClass("hide").addClass("fadeIn");
    }
  });

  $("a.next-arrow").click((e) => {
    let href = $(e.currentTarget).attr('href');
    $("#current-nav-page").text(href.split("-")[1].toUpperCase());
    index += 1;
    mobile_index += 1;
  });

  $(".arrow-color").click((e) => {
    index = 0;
    mobile_index = 0;
    $("#current-nav-page").text("HOME");
  });

  // window.addEventListener("orientationchange", function() {
  //   if (isMobile.any()) {
  //       if (window.orientation == 0) {
  //       $("#thats-me").removeClass("hide").addClass("bounceIn");
  //     } else {
  //       $("#thats-me").removeClass("bounceIn").addClass("hide");
  //     }
  //   }
  // }, false);
  

  // if (!isMobile.any() || isPortrait()) {
  //   setTimeout( () => {
  //     $("#thats-me").removeClass("hide").addClass("bounceIn");
  //   }, 1000);
  // }

  if (isMobile.any() || isMobile.isPad()) {
    $('a#mail-to').attr('href', 'mailto:pkr2100@gmail.com');
  }
});
