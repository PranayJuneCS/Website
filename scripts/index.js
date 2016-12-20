$(function() {
  console.log("ready!");
  setTimeout( () => {
    $("#call-me").removeClass("hide").addClass("slideInUp");
    setTimeout( () => {
      $("#thats-me").removeClass("hide").addClass("bounceIn");
    }, 1000);
  }, 200);
  
});