var g_mousedown = false;

$(document).ready(function(){
  $board = $('#board');
  var img = document.getElementById('source_image');
  var canvas = document.createElement('canvas');
  var k = 1;
  canvas.width = img.width/k;
  canvas.height = img.height/k;
  canvas.getContext('2d').drawImage(img, 0, 0, img.width/k, img.height/k);

  var context = canvas.getContext("2d");
  var imgData = context.getImageData(0,0,canvas.width,canvas.height);// { data: [r,g,b,a,r,g,b,a,r,g,..], ... }

  // resizing the copy image
  $('#dest_image_container').append(canvas);
  $('#dest_image_container canvas').css({'width':img.width, 'height':img.height});


  
  $('#dest_image_container canvas').on('mousemove', function(event){
    image_data = get_color(event, imgData);
    console.log(image_data);

    if (g_mousedown === true) {
      context.fillStyle = "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", "+image_data.a+")";
      context.fillRect(image_data.x, image_data.y, 1, image_data.y*-1 );
    }
  });

  $('#dest_image_container canvas').mousedown(function(event){
    g_mousedown = true;
  });
  $('#dest_image_container canvas').mouseup(function(event){
    g_mousedown = false;
  });

  $('#dest_image_container canvas').on('click', function(event){
    image_data = get_color(event, imgData);

    context.fillStyle = "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", "+image_data.a+")";
    context.fillRect(image_data.x, image_data.y, 1, image_data.y*-1 );
  });

});

function getPixel(imgData, index) {
  var i = index*4, d = imgData.data;
  return [d[i],d[i+1],d[i+2],d[i+3]] // Returns array [R,G,B,A]
}

function getPixelXY(imgData, x, y) {

  return getPixel(imgData, y*imgData.width+x);
}

function get_color(event, imgData) {
  var mouse_coordinates = {x:event.offsetX, y:event.offsetY};
  var colour = getPixelXY(imgData, mouse_coordinates.x, mouse_coordinates.y);
  var image_data = {x:mouse_coordinates.x, y:mouse_coordinates.y, r:colour[0], g:colour[1], b:colour[2], a:colour[3]};
  return image_data;
}