var g_mousedown = false;
var direction = 'bottom';
var active_tool = 'pixel_puller';
function setup_controls() {

  var palette_image = ($('#selected_colour img').eq(0))[0];
  var palette_canvas = document.createElement('canvas');
  var palette_context = palette_canvas.getContext("2d");
  palette_context.drawImage(palette_image, 0, 0, 150, 150);
  var paletteData = palette_context.getImageData(0,0,palette_image.width,palette_image.height);// { data: [r,g,b,a,r,g,b,a,r,g,..], ... }

  $('body').on('keydown', function(k){
    var keypressed = k.originalEvent.key;
    console.log(keypressed);
    switch(keypressed) {
      case "q":
        active_tool = 'pixel_puller';
        break;
      case "p":
        active_tool = 'colour_picker';
        break;
      case "ArrowUp":
        direction = 'up';
        break;
      case "ArrowDown":
        direction = 'down';
        break;
      case "ArrowLeft":
        direction = 'left';
        break;
      case "ArrowRight":
        direction = 'right';
        break;
    }

    $("#floating_palette input[name=active_tool]").val(active_tool);
    $("#floating_palette input[name=direction]").val(direction);
  });

  $('#selected_colour').on('mousedown', function(){
    $(this).find('img').show();
  });
  $('#selected_colour').on('mouseup', function(event){
    palette_colour_data = get_color(event, paletteData);
    $('#selected_colour').css({'background-color':"rgba("+palette_colour_data.r+", "+palette_colour_data.g+", "+palette_colour_data.b+", "+palette_colour_data.a+")"})
    // $(this).find('img').hide();
  });
}
$(document).ready(function(){
  
  setup_controls();

  setup_images();

  var dropZone = document.getElementById('source_image_container');
  console.log(dropZone);

  // Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
  dropZone.addEventListener('dragover', function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
  });

  // Get file data on drop
  dropZone.addEventListener('drop', function(e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files; // Array of all files

      for (var i=0, file; file=files[i]; i++) {
          if (file.type.match(/image.*/)) {
              var reader = new FileReader();

              reader.onload = function(e2) {
                  // finished reading file data.
                  var img = document.createElement('img');
                  img.src= e2.target.result;
                  img.id = 'source_image';
                  // document.body.appendChild(img);
                  $('#source_image_container *').remove();
                  $('#source_image_container').append(img);
                  setup_images();
              }

              reader.readAsDataURL(file); // start reading the file data.
          }
      }
  });
});

function getPixel(imgData, index) {
  var i = index*4, d = imgData.data;
  console.log(i, imgData.data.length)
  return [d[i],d[i+1],d[i+2],d[i+3]] // Returns array [R,G,B,A]
}

function getPixelXY(imgData, x, y) {

  return getPixel(imgData, y*imgData.width+x);
}

function get_color(event, imgData) {
  var mouse_coordinates = {x:event.offsetX, y:event.offsetY};
  var colour = getPixelXY(imgData, mouse_coordinates.x, mouse_coordinates.y);
  var image_data = {x:mouse_coordinates.x, y:mouse_coordinates.y, r:colour[0], g:colour[1], b:colour[2], a:colour[3]};
  console.log(image_data);
  return image_data;
}

function setup_images() {
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
  $('#dest_image_container img').remove();
  $('#dest_image_container').append(canvas);
  $('#dest_image_container canvas').css({'width':img.width, 'height':img.height});


  
  $('#dest_image_container canvas').on('mousemove', function(event){
    image_data = get_color(event, imgData);
    image_data.a = 0.25;
    // console.log(image_data);

    switch(active_tool) {
      case 'colour_picker':
        // $('#selected_colour').css({'background-color':"rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", "+image_data.a+")"})
        break;
      case 'pixel_puller':
      default:
        var gradient_final_color = $('#selected_colour').css('background-color'); //$('select[name=gradient_final_colour]').find(":selected").val()
        gradient_final_color_array = gradient_final_color.match(/\d+/g).map(Number);
        gradient_final_color_array.push( parseInt($('[name=gradient_final_colour_opacity]').val())/100 );
        gradient_final_color = "rgb("+gradient_final_color_array.join(',')+")";
        console.log(gradient_final_color);

        if (g_mousedown === true) {
          
          // context.fillStyle = "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", "+image_data.a+")";

          switch(direction) {
            case "up":
              var gradient = context.createLinearGradient(1,image_data.y, 1,0);
              gradient.addColorStop(0, "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", 1)");
              gradient.addColorStop(0.25, "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", "+image_data.a+")");
              gradient.addColorStop(1, gradient_final_color); //'rgba(0,0,0,0)'
              context.fillStyle = gradient;
              context.fillRect(image_data.x, image_data.y, 1, image_data.y*-1 );
              break;
            case "down":
              var gradient = context.createLinearGradient(1,image_data.y, 1,img.height);
              gradient.addColorStop(0, "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", 1)");
              gradient.addColorStop(0.25, "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", "+image_data.a+")");
              gradient.addColorStop(1, gradient_final_color); //'rgba(0,0,0,0)'
              context.fillStyle = gradient;
              context.fillRect(image_data.x, image_data.y, 1, img.height-image_data.y );
              break;
            case 'right':
              var gradient = context.createLinearGradient(image_data.x,1, img.width,1);
              gradient.addColorStop(0, "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", 1)");
              gradient.addColorStop(0.25, "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", "+image_data.a+")");
              gradient.addColorStop(1, gradient_final_color); //'rgba(0,0,0,0)'
              context.fillStyle = gradient;
              context.fillRect(image_data.x, image_data.y, img.width-image_data.x, 1 );
              break;
            case 'left':
              var gradient = context.createLinearGradient(image_data.x,1, 0,1);
              gradient.addColorStop(0, "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", 1)");
              gradient.addColorStop(0.25, "rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", "+image_data.a+")");
              gradient.addColorStop(1, gradient_final_color); //'rgba(0,0,0,0)'
              context.fillStyle = gradient;
              context.fillRect(image_data.x, image_data.y, image_data.x*-1, 1 );
              break;
          }
        }
        break;
    }


  });

  $('#dest_image_container canvas').mousedown(function(event){
    g_mousedown = true;
  });
  $('#dest_image_container canvas').mouseup(function(event){
    g_mousedown = false;
    if (active_tool == 'colour_picker') {
      image_data = get_color(event, imgData);
      $('#selected_colour').css({'background-color':"rgba("+image_data.r+", "+image_data.g+", "+image_data.b+", "+image_data.a+")"})
    }
  });

}