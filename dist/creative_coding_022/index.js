$(document).ready(function(){

  $board = $('#board');
  var ii = 0;
  var step_increment = 20; 
  var adding_lines = setInterval(add_a_line, 500);
  var origin_x = 600;
  var origin_y = 400;
  var pointA_x = origin_x;
  var pointA_y = origin_y;
  var pointB_x = 600;
  var pointB_y = 600;
  var pointC_x = 400;
  var pointC_y = 600;
  var pointD_x = 400;
  var pointD_y = 400;

  function add_a_line() {
    ii++;
    if (ii > 50) {
      // exportSVG();
      clearInterval(adding_lines);
    }

    pointA_x = pointA_x+step_increment;
    // var pointA_y = origin_y;

    // pointB_x = pointB_x;
    pointB_y = pointB_y+step_increment;

    pointC_x = pointC_x-step_increment;
    pointD_y = pointD_y-step_increment;

    var points_coordinates = pointA_x+","+pointA_y+" "
      +pointB_x+","+pointB_y+" "
      +pointC_x+","+pointC_y+" "
      +pointD_x+","+pointD_y+" ";

    var one_rectangle = {points: points_coordinates, color:'rgba(255,255,255, 0.05)', stroke_color: 'black', stroke_width:0.2};
    $new_rectangle = $(document.createElementNS("http://www.w3.org/2000/svg", "polygon")).attr({
        "points": one_rectangle.points,
        "style": "fill:"+one_rectangle.color+";stroke:"+one_rectangle.stroke_color+";stroke-width:"+one_rectangle.stroke_width+";fill-rule:nonzero;"
        });
    $board.append($new_rectangle);
  }
});