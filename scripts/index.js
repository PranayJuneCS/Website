$(function() {
  let activeDiv = window.location.hash;
  let activePage;
  switch (activeDiv) {
    case "":
      $.scrollTo($("#page-home"), 1000);
      activePage = "HOME";
      break;
    case "#home":
      $.scrollTo($("#page-home"), 1000);
      activePage = "HOME";
      break;
    case "#about":
      $.scrollTo($("#page-about"), 1000);
      activePage = "ABOUT";
      break;
    case "#projects":
      $.scrollTo($("#page-projects"), 1000);
      activePage = "PROJECTS";
      break;
    case "#stuff":
      $.scrollTo($("#page-stuff"), 1000);
      activePage = "STUFF";
      break;
    case "#contact":
      $.scrollTo($("#page-contact"), 1000);
      activePage = "CONTACT";
      break;
    default:
      $.scrollTo($("#page-home"), 1000);
      activePage = "HOME";
  }
  $("#current-nav-page").text(activePage);
  $(".active").removeClass("active");
  $(activeDiv).addClass("active");
  let navOpen = false;
  let programmedScrolling = false;

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
    console.log(e);
    let activeDiv = window.location.hash;
    switch (activeDiv) {
      case "":
        $.scrollTo($("#page-home"), 1000);
        activePage = "HOME";
        break;
      case "#home":
        $.scrollTo($("#page-home"), 1000);
        activePage = "HOME";
        break;
      case "#about":
        $.scrollTo($("#page-about"), 1000);
        activePage = "ABOUT";
        break;
      case "#projects":
        $.scrollTo($("#page-projects"), 1000);
        activePage = "PROJECTS";
        break;
      case "#stuff":
        $.scrollTo($("#page-stuff"), 1000);
        activePage = "STUFF";
        break;
      case "#contact":
        $.scrollTo($("#page-contact"), 1000);
        activePage = "CONTACT";
        break;
      default:
        $.scrollTo($("#page-home"), 1000);
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
    $.scrollTo($("#page-" + event.target.id), 1000, {
      onAfter: function() {
        programmedScrolling = false;
      }
    });
    closeNav();
    activePage = event.target.id.toUpperCase();
    $("#current-nav-page").text(activePage);
    $(".active").removeClass("active");
    $("#" + event.target.id).addClass("active");
  });

  $(window).scroll(function(e) {
    // if (!programmedScrolling) {
    //   var inView = isElementInView($('#page-' + activePage.toLowerCase()), false);
    //   if (inView) {
    //       console.log('in view');
    //   } else {
    //       console.log('out of view');
    //   }
    // }
    // console.log(e);
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
