$(function() {
  console.log("ready!");
  setTimeout( () => {
    $("#call-me").removeClass("hide").addClass("slideInUp");
    console.log("YOO");
  }, 200);
});