$(function() {

  let programmedScrolling = false;

  var scrollToDiv = (div) => {
    programmedScrolling = true;
    $.scrollTo($(div), 700, {
      onAfter: function() {
        programmedScrolling = false;
      }
    });
  }

  var changeActivePage = (newActivePage, newActiveDiv) => {
    $("#current-nav-page").text(newActivePage);
    $(".active").removeClass("active");
    $(newActiveDiv).addClass("active");
  }

  let activeDiv = window.location.hash;
  let activePage;
  switch (activeDiv) {
    // case "":
    //   scrollToDiv("#page-home");
    //   activePage = "HOME";
    //   break;
    // case "#home":
    //   scrollToDiv("#page-home");
    //   activePage = "HOME";
    //   break;
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

  /* BEGINNING OF JQUERY/LOGIC */

  window.onhashchange = function(e) {
    console.log(e);
    let activeDiv = window.location.hash;
    console.log(activeDiv);
    switch (activeDiv) {
      // case "":
      //   scrollToDiv("#page-home");
      //   activePage = "HOME";
      //   break;
      // case "#home":
      //   scrollToDiv("#page-home");
      //   activePage = "HOME";
      //   break;
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
        console.log("YOOOOO");
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
    console.log(event.target.id);
    window.location.hash = "#" + event.target.id;
    closeNav();
    activePage = event.target.id.toUpperCase();
    changeActivePage(activePage, "#" + event.target.id);
  });

  var $pages = $(".full-screen");
  var index = 0;
  var pagePos = 0;
  var down = 0;
  var listen = true;

  // window.ontouchmove = (e) => {
  //   console.log("TOUCHMOVE");
  // };

  $('html, body').on('DOMMouseScroll mousewheel', function(e) {
    console.log("TOUCHMOVE");
    console.log(e);
    e.preventDefault();

    if(!listen) {
      return;
    }
    
    listen = false;
    if (Math.abs(e.originalEvent.deltaY) < 13) { // not enough scroll
      listen = true;
      return false;
    }
    down = e.originalEvent.deltaY > 0;
    index = Math.min(Math.max(0, down ? ++index : --index), $pages.length - 1);
    pagePos = $pages.eq(index).offset().top;

    $(this).stop().animate({scrollTop: pagePos}, 700, () => {
      listen = true;
    });

    let pageId = $pages[index].id.split("-")[1];
    activePage = pageId.toUpperCase();
    changeActivePage(activePage, "#" + pageId);
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
