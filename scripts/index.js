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

  var scrollToDiv = (div) => {
    programmedScrolling = true;
    $.scrollTo($(div), 800, {
      onAfter: function() {
        programmedScrolling = false;
        listen = true;
        mobile_listen = true;
      }
    });
  };

  var isScrolledIntoView = (elem) => {
    var docViewTop = $(window).scrollTop();
    var docViewMiddle = docViewTop + ($(window).height() / 2);
    var elemTop = $(elem).offset().top;
    return elemTop <= docViewMiddle;
  }

  var changeActivePage = (newActivePage, newActiveDiv) => {
    $("#current-nav-page").text(newActivePage);
    $(".active").removeClass("active");
    $(newActiveDiv).addClass("active");
  };

  var setActivePageIOS = () => {
    var fullScreenDivs = $(".full-screen");
    var docViewTop = $(window).scrollTop();
    var docViewMiddle = docViewTop + ($(window).height() / 2);
    var elemTop;
    var elemBottom;

    $(".full-screen").each( (i) => {
      elemTop = $(fullScreenDivs[i]).offset().top;
      elemBottom = elemTop + $(fullScreenDivs[i]).height();
      if (elemTop <= docViewMiddle && elemBottom > docViewMiddle) {
        $(".active").removeClass("active");
        var id = fullScreenDivs[i].id.split("-")[1];
        $("#" + id).addClass("active");
        history.replaceState({}, '', ("#" + id));
        return false;
      }
    });
  };

  let activeDiv = window.location.hash;
  let activePage;
  switch (activeDiv) {
    case "#about":
      mobile_index = 1;
      index = 1;
      scrollToDiv("#page-about");
      activePage = "ABOUT";
      break;
    case "#projects":
      mobile_index = 2;
      index = 2;
      scrollToDiv("#page-projects");
      activePage = "PROJECTS";
      break;
    case "#stuff":
      mobile_index = 3;
      index = 3;
      scrollToDiv("#page-stuff");
      activePage = "STUFF";
      break;
    case "#contact":
      mobile_index = 4;
      index = 4;
      scrollToDiv("#page-contact");
      activePage = "CONTACT";
      break;
    default:
      mobile_index = 0;
      index = 0;
      scrollToDiv("#page-home");
      activePage = "HOME";
      activeDiv = "#home";
  }
  changeActivePage(activePage, activeDiv);
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
    $("#current-nav-page").text(activePage);
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

  window.onhashchange = function(e) {
    let activeDiv = window.location.hash;
    switch (activeDiv) {
      case "#about":
        mobile_index = 1;
        index = 1;
        scrollToDiv("#page-about");
        activePage = "ABOUT";
        break;
      case "#projects":
        mobile_index = 2;
        index = 2;
        scrollToDiv("#page-projects");
        activePage = "PROJECTS";
        break;
      case "#stuff":
        mobile_index = 3;
        index = 3;
        scrollToDiv("#page-stuff");
        activePage = "STUFF";
        break;
      case "#contact":
        mobile_index = 4;
        index = 4;
        scrollToDiv("#page-contact");
        activePage = "CONTACT";
        break;
      default:
        mobile_index = 0;
        index = 0;
        scrollToDiv("#page-home");
        activePage = "HOME";
        activeDiv = "#home";
    }
    changeActivePage(activePage, activeDiv);
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

  $(".item").on('click', (event) => {
    programmedScrolling = true;
    if (history.pushState) {
      if (window.location.hash == ("#" + event.target.id)) {
        event.preventDefault();
        history.replaceState({}, '', ("#" + event.target.id));
      }
    }
    closeNav();
  });

  $mobile_pages = $(".full-screen");
  mobile_pagePos = 0;
  mobile_up = 0;
  mobile_listen = true;

  if (isMobile.iOS()) {

  } else {
    $('html, body').swipe({
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        event.preventDefault();

        if(!mobile_listen || navOpen) {
          return;
        }
        
        mobile_listen = false;
        if (duration <= 100 || !["down", "up"].includes(direction)) { // not enough swipe
          mobile_listen = true;
          return false;
        }
        mobile_up = direction != "down";
        mobile_index = Math.min(Math.max(0, mobile_up ? ++mobile_index : --mobile_index), $mobile_pages.length - 1);
        mobile_pagePos = $mobile_pages.eq(mobile_index).offset().top;

        let pageId = $mobile_pages[mobile_index].id.split("-")[1];
        $(this).stop();
        if (window.location.hash == ("#" + pageId)) {
          mobile_listen = true;
          return;
        }
        window.location.hash = "#" + pageId;
      }
    });
  }
  

  $pages = $(".full-screen");
  pagePos = 0;
  down = 0;
  listen = true;

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

    let pageId = $pages[index].id.split("-")[1];
    $(this).stop();
    if (window.location.hash == ("#" + pageId)) {
      listen = true;
      return;
    }
    window.location.hash = "#" + pageId;
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

  window.addEventListener("orientationchange", function() {
    if (isMobile.any()) {
        if (window.orientation == 0) {
        $("#thats-me").removeClass("hide").addClass("bounceIn");
      } else {
        $("#thats-me").removeClass("bounceIn").addClass("hide");
      }
    }
  }, false);

  if (!isMobile.any() || isPortrait()) {
    setTimeout( () => {
      $("#thats-me").removeClass("hide").addClass("bounceIn");
    }, 1000);
  }

  if (isMobile.any() || isMobile.isPad()) {
    $('a#mail-to').attr('href', 'mailto:pkr2100@gmail.com');
  }
});
