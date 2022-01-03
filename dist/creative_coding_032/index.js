$(document).ready(function(){
  $board = $('#board');
  var img = document.getElementById('source_image');
  var canvas = document.createElement('canvas');
  var k = 5;
  canvas.width = img.width/k;
  canvas.height = img.height/k;
  canvas.getContext('2d').drawImage(img, 0, 0, img.width/k, img.height/k);

  //resizing svg #board
  $board.css({'width':img.width, 'height':img.height});
  // resizing the copy image
  $('#dest_image_container').append(canvas);
  $('#dest_image_container canvas').css({'width':img.width, 'height':img.height});

// data manipulation on image
  var context = canvas.getContext("2d");
  var imgData = context.getImageData(0,0,canvas.width,canvas.height);
  // { data: [r,g,b,a,r,g,b,a,r,g,..], ... }

  function getPixel(imgData, index) {
    var i = index*4, d = imgData.data;
    return [d[i],d[i+1],d[i+2],d[i+3]] // Returns array [R,G,B,A]
  }

  // AND/OR

  function getPixelXY(imgData, x, y) {
    return getPixel(imgData, y*imgData.width+x);
  }

  var reduce_colour_range_factor = 32;
  function reduce_colour_range(val) {
      return Math.round(val/reduce_colour_range_factor)*reduce_colour_range_factor;
  }


  // generating the svg, pixel by pixel
  for (coordX = 0; coordX < canvas.width; coordX++) {
    for (coordY = 0; coordY < canvas.height; coordY++) {
      // console.log( getPixelXY(imgData, coordX, coordY) )

      var rgba_color = getPixelXY(imgData, coordX, coordY);
      var svg_rgba_color = "rgb("+reduce_colour_range(rgba_color[0])+","+reduce_colour_range(rgba_color[1])+","+reduce_colour_range(rgba_color[2])+")"; //"rgba("+rgba_color[0]+","+rgba_color[1]+","+rgba_color[2]+","+rgba_color[3]+")";

      var pointA_x = (coordX)*k;
      var pointB_x = (coordX+1)*k;
      var pointC_x = (coordX+1)*k;
      var pointD_x = (coordX)*k;

      var pointA_y = (coordY)*k;
      var pointB_y = (coordY)*k;
      var pointC_y = (coordY+1)*k;
      var pointD_y = (coordY+1)*k;


      var points_coordinates = pointA_x+","+pointA_y+" "
        +pointB_x+","+pointB_y+" "
        +pointC_x+","+pointC_y+" "
        +pointD_x+","+pointD_y+" ";

      var one_pixel = {points: points_coordinates, color: svg_rgba_color, stroke_color: 'black', stroke_width:0};
      $new_rectangle = $(document.createElementNS("http://www.w3.org/2000/svg", "polygon")).attr({
          "points": one_pixel.points,
          "style": "fill:"+one_pixel.color+";stroke:"+one_pixel.stroke_color+";stroke-width:"+one_pixel.stroke_width+";fill-rule:nonzero;"
          });
      $board.append($new_rectangle);

    }
  }


});