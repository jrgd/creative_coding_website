$(document).ready(function(){

  $board = $('#board');

  var origin_x = 10;
  var origin_y = 10;
  
  var width = 120;
  var height = 5;
  var gap_x = 3;
  var gap_y = 2;


  window.setInterval(render_screen, 20);

function render_screen() {

  $board.empty();

  var max_repeat_x = $(window).innerWidth() - width;
  var max_repeat_y = $(window).innerHeight() - height;

  for (var repeat_x = origin_x; repeat_x < max_repeat_x; repeat_x = repeat_x + width + gap_x) {
    for (var repeat_y = origin_y; repeat_y < max_repeat_y; repeat_y = repeat_y + height + gap_y) {

      var random_extra =  Math.sin(repeat_y)*Math.cos(repeat_x)*4+(Math.floor(Math.random()*2-1)*1.1);
      var the_bar = repeat_x+","+repeat_y+" "
        +(repeat_x+width)+","+(repeat_y+height+random_extra)+" "
      $polygon = $(document.createElementNS("http://www.w3.org/2000/svg", "polygon")).attr({
          "points": the_bar,
          "style": "fill:transparent; stroke:white; stroke-width:1; fill-rule:nonzero;"
          });
      $board.append($polygon);

    }
  }
}
  
  
});