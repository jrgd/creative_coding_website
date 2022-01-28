$(document).ready(function(){

  $board = $('#board');

  var origin_x = 10;
  var origin_y = 10;
  var face_width = 20;
  var face_height = 20;
  var decal_y = 10;
  var decal_x = 10;

  var pattern_element_distance_x = 25;
  var pattern_element_distance_y = 25;

  var pattern_repeat_quantity_x = 53;
  var pattern_repeat_quantity_y = 28;

  var patterns = []; 


    for (var repeat_x = 0; repeat_x < pattern_repeat_quantity_x; repeat_x++) {

      // current_face_width = face_width;
      current_face_width = face_width / pattern_repeat_quantity_x * (repeat_x + 1);
      // console.log(current_face_width);


      for (var repeat_y = 0; repeat_y < pattern_repeat_quantity_y; repeat_y++) {
        
        // current_face_height = face_height
        current_face_height = face_height / pattern_repeat_quantity_y * (repeat_y + 1);

        // prepare current iteration:
        current_origin_x = origin_x + (repeat_x * pattern_element_distance_x);
        current_origin_y = origin_y + (repeat_y * pattern_element_distance_y);

        // predefined positions
        // ii+","+ii2+" "+ii3+","+ii4+" "
        // 10,10 20,20
        var top_face = current_origin_x+","+current_origin_y+" "
          +(current_origin_x+decal_x)+","+(current_origin_y-decal_y)+" "
          +(current_origin_x+decal_x+current_face_width)+","+(current_origin_y-decal_y)+" "
          +(current_origin_x+current_face_width)+","+current_origin_y+" "
          +current_origin_x+","+current_origin_y;
        var side_face = (current_origin_x+current_face_width)+","+current_origin_y+" "
          +(current_origin_x+current_face_width+decal_x)+","+(current_origin_y-decal_y)+" "
          +(current_origin_x+current_face_width+decal_x)+","+(current_origin_y-decal_y+current_face_height)+" "
          +(current_origin_x+current_face_width)+","+(current_origin_y+current_face_height)+" "
          +(current_origin_x+current_face_width)+","+current_origin_y;
        var front_face = current_origin_x+","+current_origin_y+" "
          +current_origin_x+","+(current_origin_y+current_face_height)+" "
          +(current_origin_x+current_face_width)+","+(current_origin_y+current_face_height)+" "
          +(current_origin_x+current_face_width)+","+current_origin_y+" "
          current_origin_x+","+current_origin_y;

        var polygons_points = [
          {points:top_face, color:'transparent', stroke_color:'white', stroke_width:1},
          {points:side_face, color:'transparent', stroke_color:'white', stroke_width:1},
          {points:front_face, color:'transparent', stroke_color:'white', stroke_width:1},
          ];

        patterns.push(polygons_points);

      }
    }

  patterns.map(function(polygons_points){
    polygons_points.map(function(face){
      $polygon = $(document.createElementNS("http://www.w3.org/2000/svg", "polygon")).attr({
          "points": face.points,
          "style": "fill:"+face.color+";stroke:"+face.stroke_color+";stroke-width:"+face.stroke_width+";fill-rule:nonzero;"
          });
      $board.append($polygon);
    });
  });
  
  
});