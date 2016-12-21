$(function() {
  let activePage = "HOME";
  let navOpen = false;

  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
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

  $("#logo-container img, #hover-menu").mouseover(() => {
    if (!isMobile.any()) {
      toggleNav();
    }
  });

  $("#logo-container img").on('click', () => {
    if (isMobile.any()) {
      toggleNav();
    }
  })

  $(".closebtn").on('click', () => {
    closeNav();
  });

  $("#mySidenav").mouseleave(() => {
    closeNav();
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
