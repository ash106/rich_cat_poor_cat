$(function() {
  var cats = $('#cats').data('cats');
  console.table(cats);

  var canvas = document.getElementById('c');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  var cw = canvas.width;
  var ch = canvas.height;
  var cx = 241;
  var cy = 267;
  var catRadius = 35;
  var radius = 0;

  $('#next').attr('disabled', true);

  img.onload = function() {
    requestAnimationFrame(intro);
    console.log("onload");
  };

  img.src = "http://s3.amazonaws.com/rich-poor-cat-dev/cats/images/000/000/001/medium/open-uri20150307-64667-1s7fxl1?1425765754";

  function draw() {
    ctx.clearRect(0,0,cw,ch);

    // Save the state, so we can undo the clipping
    ctx.save();
 
    // Create a circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
 
    // Clip to the current path
    ctx.clip();
 
    ctx.drawImage(img, 0, 0);
 
    // Undo the clipping
    ctx.restore();
  }

  function intro(time) {
    if (radius >= catRadius) { return; }
    radius += 1;
    draw();
    requestAnimationFrame(intro);
    console.log("intro");
  }

  function outro(time) {
    if (radius > 600) { 
      $('#next').attr('disabled', false);
      return; 
    }
    radius += 5;
    draw();
    requestAnimationFrame(outro);
    console.log("outro");
  }

  $("#button").click(function(){
    // ctx.drawImage(img, 0, 0);
    requestAnimationFrame(outro);
    console.log("clicked");
  })

  $("#next").click(function(){
    // ctx.drawImage(img, 0, 0);
    img.src = "http://s3.amazonaws.com/rich-poor-cat/cats/images/000/000/004/medium/open-uri20140509-2-1nmlj6n?1399672120";
    cx = 160;
    cy = 165;
    catRadius = 37;
    radius = 0;
    $('#next').attr('disabled', true);
    // requestAnimationFrame(intro);
    console.log("next");
  })
});
