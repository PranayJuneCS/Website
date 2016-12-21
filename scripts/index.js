$(function() {

  $('body').addClass('stop-scrolling');

  let programmedScrolling = false;

  var scrollToDiv = (div) => {
    programmedScrolling = true;
    $.scrollTo($(div), 700, {
      onAfter: function() {
        console.log("DONE");
        programmedScrolling = false;
      }
    });
  }

  let activeDiv = window.location.hash;
  let activePage;
  switch (activeDiv) {
    case "":
      activeDiv = "#home";
    case "#home":
      scrollToDiv("#page-home");
      activePage = "HOME";
      break;
    case "#about":
      scrollToDiv("#page-about");
      activePage = "ABOUT";
      break;
    case "#projects":
      scrollToDiv("#page-projects");
      activePage = "PROJECTS";
      break;
    case "#stuff":
      scrollToDiv("#page-stuff");
      activePage = "STUFF";
      break;
    case "#contact":
      scrollToDiv("#page-contact");
      activePage = "CONTACT";
      break;
    default:
      scrollToDiv("#page-home");
      activePage = "HOME";
  }
  $("#current-nav-page").text(activePage);
  $(".active").removeClass("active");
  $(activeDiv).addClass("active");
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
    document.getElementById("current-nav-page").style.color = "white";
    navOpen = true;
  };

  var closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    $("#current-nav-page").text(activePage);
    document.getElementById("current-nav-page").style.color = "black";
    navOpen = false;
  };

  var toggleNav = () => {
    if (navOpen) {
      closeNav();
    } else {
      openNav();
    }
  };

  var isElementInView = (element, fullyInView) => {
      var pageTop = $(window).scrollTop();
      var pageBottom = pageTop + $(window).height();
      var elementTop = $(element).offset().top;
      var elementBottom = elementTop + $(element).height();

      if (fullyInView === true) {
          return ((pageTop < elementTop) && (pageBottom > elementBottom));
      } else {
          return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
      }
  };

  /* BEGINNING OF JQUERY/LOGIC */

  window.onhashchange = function(e) {
    let activeDiv = window.location.hash;
    switch (activeDiv) {
      case "":
        activeDiv = "#home";
      case "#home":
        scrollToDiv("#page-home");
        activePage = "HOME";
        break;
      case "#about":
        scrollToDiv("#page-about");
        activePage = "ABOUT";
        break;
      case "#projects":
        scrollToDiv("#page-projects");
        activePage = "PROJECTS";
        break;
      case "#stuff":
        scrollToDiv("#page-stuff");
        activePage = "STUFF";
        break;
      case "#contact":
        scrollToDiv("#page-contact");
        activePage = "CONTACT";
        break;
      default:
        scrollToDiv("#page-home");
        activePage = "HOME";
    }
    $("#current-nav-page").text(activePage);
    $(".active").removeClass("active");
    $(activeDiv).addClass("active");
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
    window.location.hash = "#" + event.target.id;
    closeNav();
    activePage = event.target.id.toUpperCase();
    $("#current-nav-page").text(activePage);
    $(".active").removeClass("active");
    $("#" + event.target.id).addClass("active");
  });

  var $pages = $(".full-screen"),
      tot = $pages.length,
      c = 0, pagePos = 0, down = 0, listen = true;

  $('html, body').on('DOMMouseScroll mousewheel', function(e) {
    
    e.preventDefault();
    if(!listen)return;
    
    listen = false;
    
    down = e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0;
    console.log(down);
    c = Math.min(Math.max(0, down ? ++c : --c), tot-1);
    pagePos = $pages.eq(c).offset().top;  
    $(this).stop().animate({scrollTop: pagePos}, 700, function(){
      listen = true;
    });
    
  });

  setTimeout( () => {
    $("#call-me").removeClass("hide").addClass("slideInUp");

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
  }, 200);
});
