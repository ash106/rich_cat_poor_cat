# Rich Cat/Poor Cat

[Demo](http://richpoorcat.com/)

![Rich Cat/Poor Cat](http://i.imgur.com/XLzo6QC.gif)

## Built With

* [Ruby on Rails](http://rubyonrails.org/) - Used to store cat data (images, mask attributes, finances)
* [Materialize](http://materializecss.com/) - CSS framework used for grid and styling
* [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - `<canvas>` used to draw masked images

## Relevant Code

`welcome#index` passes the cat data as JSON thru a `data-cats` attribute in the view

```ruby
# app/controllers/welcome_controller.rb

class WelcomeController < ApplicationController
  def index
    @cats = ActiveModelSerializers::SerializableResource.new(Cat.all)
  end
end
```

```erb
<!-- app/views/welcome/index.html.erb -->

<%= content_tag "div", id: "cats", data: { cats: @cats } do %>
<% end %>
```

All the good stuff happens in `welcome.js`

```javascript
// app/assets/javascripts/welcome.js

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

  // Get first cat
  get_next_cat();

  // Start intro animation on image load
  img.onload = function() {
    requestAnimationFrame(intro);
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

  // Draw current cat and mask 
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
  }

  // Check win condition and play outro animation
  $("#rich, #poor").click(function(){
    $('#rich, #poor').hide();
    if ($(this).attr('id') === cat.finances) {
      $('#result-text').text("You Win!");
    } else {
      $('#result-text').text("Loser");
    }
    $('#result-text, #next').show();
    requestAnimationFrame(outro);
  })

  // Load next cat's data
  $("#next").click(function(){
    count += 1;
    // If last cat in shuffled_cats, reshuffle the array
    if (count > cats.length - 1) {
      shuffled_cats = _.shuffle(cats);
      count = 0;
    }
    get_next_cat();
  })
});
```

## Getting Started

### Prerequisites

```bash
ruby -v     # 2.3.3
rails -v    # 5.0.1
```

### Installing

Install dependencies

```bash
bundle install
```

Create `.env` file in project's root directory

```
S3_BUCKET_NAME=s3-bucket-name
AWS_ACCESS_KEY_ID=aws-id
AWS_SECRET_ACCESS_KEY=aws-secret-key
AWS_REGION=aws-region
```

Setup database

```bash
rails db:setup
```

Run server

```bash
rails s
```

[Check out dem cats](http://localhost:3000/)
