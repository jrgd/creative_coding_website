$(document).ready(function(){

  $board = $('#board');

  var origin_x = 10;
  var origin_y = 10;
  
  var width = 80;
  var height = 10;
  var gap_x = 12;
  var gap_y = 10;

  var max_repeat_x = $(window).innerWidth() - width;
  var max_repeat_y = $(window).innerHeight() - height;

  for (var repeat_x = origin_x; repeat_x < max_repeat_x; repeat_x = repeat_x + width + gap_x) {
    for (var repeat_y = origin_y; repeat_y < max_repeat_y; repeat_y = repeat_y + height + gap_y) {

      var random_extra =  Math.sin(repeat_y)*4;
      var the_bar = repeat_x+","+repeat_y+" "
        +(repeat_x+width)+","+(repeat_y+height+random_extra)+" "
      $polygon = $(document.createElementNS("http://www.w3.org/2000/svg", "polygon")).attr({
          "points": the_bar,
          "style": "fill:transparent; stroke:white; stroke-width:1; fill-rule:nonzero;"
          });
      $board.append($polygon);

    }
  }
  
});