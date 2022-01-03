$(document).ready(function(){

  $board = $('#board');

  
  var origin_x, origin_y;
  var radius = 150;
  var all_lines = [];
  var circle_loop = 0;
  var steps_increment = 45;
  var colours = ['white']; //['white','lightgrey','grey','darkgrey']; //['pink','red','orange','yellow','lime','green','cyan','blue','violet'];
  var row = 0;
  
  for (origin_y = 0; origin_y < $(window).height(); origin_y = origin_y + 70) {
    row++;
    for (origin_x = 0 + ((row % 2) * 150); origin_x < $(window).width(); origin_x = origin_x + 300) {
      for (ii = 0; ii < 7; ii = ii + (1 / steps_increment)) {
        add_a_line(ii, origin_x, origin_y);
      }  
    }
  }

function add_a_line(circle_loop) {
  // circle_loop = circle_loop + 1/steps_increment;

  var pointA_x = origin_x+(radius * Math.cos(circle_loop));
  var pointA_y = origin_y+(radius * Math.sin(circle_loop));
  pointA_x = Math.round(pointA_x * 100) / 100;
  pointA_y = Math.round(pointA_y * 100) / 100;

  var canvas = document.getElementById("board");
  var ctx = canvas.getContext("2d");

  var stroke_color = colours[ Math.floor(circle_loop*steps_increment) % colours.length ];
  ctx.beginPath();
  ctx.strokeStyle = stroke_color;
  ctx.moveTo(origin_x,origin_y);
  ctx.lineTo(pointA_x,pointA_y);
  ctx.stroke();
}
  
});