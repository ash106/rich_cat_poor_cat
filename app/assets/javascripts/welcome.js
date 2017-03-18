$(function() {
  // Variables and such
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  var cw = canvas.width;
  var ch = canvas.height;
  var cx;
  var cy;
  var catRadius;
  var radius = 0;
  var count = 0;
  var cat;

  // Get cat data and shuffle cats into random order
  var cats = $('#cats').data('cats');
  var shuffled_cats = _.shuffle(cats);
  console.table(shuffled_cats);

  // Get first cat
  get_next_cat();

  // Start intro animation on image load
  img.onload = function() {
    requestAnimationFrame(intro);
    console.log("onload");
  };

  // Hide result and next button, show rich and poor buttons, load next cat's data
  function get_next_cat() {
    $('#result-text').hide();
    $('#next').hide().attr('disabled', true);
    $('#rich, #poor').show().attr('disabled', true);
    cat = shuffled_cats[count];
    img.src = cat.image_url;
    cx = cat.x;
    cy = cat.y;
    catRadius = cat.radius;
    radius = 0;
  }

  // 
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

  // Intro animation
  function intro(time) {
    if (radius >= catRadius) { 
      $('#rich, #poor').attr('disabled', false);
      return; 
    }
    radius += 1;
    draw();
    requestAnimationFrame(intro);
    console.log("intro");
  }

  // Outro animation
  function outro(time) {
    if (radius > 566) { 
      $('#next').attr('disabled', false);
      return;
    }
    radius += 5;
    draw();
    requestAnimationFrame(outro);
    console.log("outro");
  }

  // Check win condition and play outro animation
  $("#rich, #poor").click(function(){
    console.log($(this).attr('id'));
    console.log(cat.finances);
    $('#rich, #poor').hide();
    if ($(this).attr('id') === cat.finances) {
      $('#result-text').text("You Win!");
    } else {
      $('#result-text').text("Loser");
    }
    $('#result-text, #next').show();
    requestAnimationFrame(outro);
    console.log("clicked");
  })

  // Load next cat's data
  $("#next").click(function(){
    count += 1;
    console.log(count);
    // If last cat in shuffled_cats, reshuffle the array
    if (count > cats.length - 1) {
      console.log("reshuffle");
      shuffled_cats = _.shuffle(cats);
      count = 0;
    }
    get_next_cat();
    console.log("next");
  })
});
