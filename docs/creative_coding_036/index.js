var units_x = 50; // number of units on one axis
var units_y = 50;
var cx = units_x/2, cy = units_y/2; // center for strating the pixel
var colour_class = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan'];
var current_colour_class_index = 0;
var current_colour_class = colour_class[current_colour_class_index]; // black by default at start
var primitives = ['','square', 'circle', 'triangle', 'qc_tr'];
var primitives_display = ['','S', 'C', 'T', 'qc1'];
var next_shape_index = 0;

$(document).ready(function(){
  $('body').on('keydown', function(k){
    var keypressed = k.originalEvent.key;
    console.log(k);
    console.log(keypressed, cx, cy);
    $('.single_square').removeClass('selected');
    switch(true) {
      // MOVES
        case keypressed == 'w':
          cy = cy - 1;
          break;
        case keypressed == 'a':
          cx = cx - 1;
          break;
        case keypressed == 's':
          cy = cy + 1;
          break;
        case keypressed == 'd':
          cx = cx + 1;
          break;

      // SHAPES/BRUSHES
        case keypressed =='u':
          $('#container .c'+cx+'.r'+cy).toggleClass('pixel_on');
          $('#container .c'+cx+'.r'+cy).addClass(current_colour_class);
          break;
        case keypressed =='i':
          // row 1
          $('#container .c'+(cx-1)+'.r'+(cy-1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+cx+'.r'+(cy-1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+(cx+1)+'.r'+(cy-1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          // row 2
          $('#container .c'+(cx-1)+'.r'+cy)
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+cx+'.r'+cy)
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+(cx+1)+'.r'+cy)
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          // row 3
          $('#container .c'+(cx-1)+'.r'+(cy+1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+cx+'.r'+(cy+1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+(cx+1)+'.r'+(cy+1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          break;
        case keypressed =='o':
          console.log(Math.floor(Math.random()*colour_class.length));
          // row 1
          $('#container .c'+(cx-1)+'.r'+(cy-1))
            .toggleClass('pixel_on')
            .addClass(colour_class[Math.floor(Math.random()*colour_class.length)]);
          $('#container .c'+(cx+1)+'.r'+(cy-1))
            .toggleClass('pixel_on')
            .addClass(colour_class[Math.floor(Math.random()*colour_class.length)]);
          // row 2
          $('#container .c'+cx+'.r'+cy)
            .toggleClass('pixel_on')
            .addClass(colour_class[Math.floor(Math.random()*colour_class.length)]);
          // row 3
          $('#container .c'+(cx-1)+'.r'+(cy+1))
            .toggleClass('pixel_on')
            .addClass(colour_class[Math.floor(Math.random()*colour_class.length)]);
          $('#container .c'+(cx+1)+'.r'+(cy+1))
            .toggleClass('pixel_on')
            .addClass(colour_class[Math.floor(Math.random()*colour_class.length)]);
          break;
        case keypressed =='p':
          // row 1
          $('#container .c'+(cx-1)+'.r'+(cy-1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+cx+'.r'+(cy-1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+(cx+1)+'.r'+(cy-1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          // row 2
          $('#container .c'+(cx-1)+'.r'+cy)
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+(cx+1)+'.r'+cy)
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          // row 3
          $('#container .c'+(cx-1)+'.r'+(cy+1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+cx+'.r'+(cy+1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          $('#container .c'+(cx+1)+'.r'+(cy+1))
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          break;

        case keypressed =='j': // toggle active class → colour
            current_colour_class_index = $.inArray(current_colour_class, colour_class);
            current_colour_class_index = (current_colour_class_index > colour_class.length-1) ?  0 : current_colour_class_index+1;
            current_colour_class = colour_class[current_colour_class_index];
            break;

        case keypressed =='k': // invert all colours
          $('#container .single_square')
            .toggleClass('pixel_on')
            .addClass(current_colour_class);
          break;

      // DRAW
        case keypressed == 'r':
          for (var dx = 0; dx <= units_x; dx++) {
            console.log(dx)
            $('#container .c'+dx+'.r'+cy)
              .toggleClass('pixel_on')
              .addClass(current_colour_class);
          }
          break;
        case keypressed == 't':
          for (var dy = 0; dy <= units_y; dy++) {
            $('#container .c'+cx+'.r'+dy)
              .toggleClass('pixel_on')
              .addClass(current_colour_class);
          }
          break;
        case keypressed == 'y':
          for (var dy = 0; dy <= units_y; dy++) {
            $('#container .c'+cx+'.r'+dy)
              .toggleClass('pixel_on')
              .addClass(current_colour_class);
          }
          for (var dx = 0; dx <= units_x; dx++) {
            console.log(dx)
            $('#container .c'+dx+'.r'+cy)
              .toggleClass('pixel_on')
              .addClass(current_colour_class);
          }
          break;

      // DRAW with boundaries: draw a line up to the next pixel (or the border) in both direction
        case keypressed == 'f':
          ty = cy;
          console.log('init at '+cy);
          // go up
          while(!$('#container .c'+cx+'.r'+ty).hasClass('pixel_on') && ty >= 0) {
            
            ty = ty - 1;
            console.log(ty);
          }
          console.log(ty);
          start_y = ty;
          console.log('start at '+start_y);
          ty = cy;
          // go down
          while(!$('#container .c'+cx+'.r'+ty).hasClass('pixel_on') && ty <= units_y) {
            
            ty = ty + 1;
            console.log(ty);
          }


          end_y = ty;
          console.log('ends at '+end_y);


          for (var dy = start_y; dy <= end_y; dy++) {
            console.log(dy)
            $('#container .c'+cx+'.r'+dy)
              .addClass('pixel_on')
              .addClass(current_colour_class);
          }

          console.log ('line-fill is done.')
          break;
        case keypressed == 'g':
            tx = cx;
            console.log('init at '+cy);
            // go up
            while(!$('#container .c'+tx+'.r'+cy).hasClass('pixel_on') && tx >= 0) {
              
              tx = tx - 1;
              console.log(tx);
            }
            console.log(tx);
            start_x = tx;
            console.log('start at '+start_x);
            tx = cx;
            // go down
            while(!$('#container .c'+tx+'.r'+cy).hasClass('pixel_on') && tx <= units_x) {
              
              tx = tx + 1;
              console.log(tx);
            }


            end_x = tx;
            console.log('ends at '+end_x);


            for (var dx = start_x; dx <= end_x; dx++) {
              console.log(dx)
              $('#container .c'+dx+'.r'+cy)
                .addClass('pixel_on')
                .addClass(current_colour_class);
            }

            console.log ('line-fill is done.')
            break;
        case keypressed == 'h': // FLOODFILLING
          // start point
          var next_col = [{x:cx,y:cy}]; // this will be our value store
          while(next_col.length) { // for as long as there are values stored in next_col, we loop through it
            var coord_set = next_col.shift(); // we get the first set of coordinates; it's automatically removed from the value store
            nx = csx = coord_set.x;
            ny = csy = coord_set.y;
            // → GOING UP
            while(!$('#container .c'+csx+'.r'+ny).hasClass('pixel_on') && ny >= 0) {
              // test neighbours on the left
              nx = csx - 1;
              if (!$('.c'+nx+'.r'+ny).hasClass('pixel_on')) { // already painted? = hitting a border on the left
                if ($.inArray({x:nx,y:ny}, next_col) < 0) { // already stored?
                  next_col.push({x:nx,y:ny});  // we store the left neighbour
                }
              }
              // test neighbours on the right
              nx = csx + 1;
              if (!$('#container .c'+nx+'.r'+ny).hasClass('pixel_on')) { // already painted? = hitting a border on the right
                if ($.inArray({x:nx,y:ny}, next_col) < 0) { // already stored?
                  next_col.push({x:nx,y:ny});  // we store the right neighbour
                }
              }

              $('#container .c'+csx+'.r'+ny).addClass('pixel_on'); // mark it so we escape the loop
              ny = ny - 1; // (remember: we said GOING UP…)
            }
            start_y = ny; // we store the escaping value

            nx = csx = coord_set.x;
            ny = csy = coord_set.y+1;
            // → GOING DOWN (etc.) process is fairly similar
            while(!$('#container .c'+csx+'.r'+ny).hasClass('pixel_on') && ny <= units_y) {

              nx = csx - 1;
              console.log('TESTING: ',nx,ny);
              // test neighbours on the left
              if (!$('#container .c'+nx+'.r'+ny).hasClass('pixel_on')) {
                if ($.inArray({x:nx,y:ny}, next_col) < 0) {
                  next_col.push({x:nx,y:ny});  
                }
              }
              
              nx = csx + 1;
              console.log('TESTING: ',nx,ny);
              // test neighbours on the right
              if (!$('#container .c'+nx+'.r'+ny).hasClass('pixel_on')) {
                if ($.inArray({x:nx,y:ny}, next_col) < 0) {
                  next_col.push({x:nx,y:ny});  
                }
              }

              $('#container .c'+csx+'.r'+ny)
                .addClass('pixel_on')
                .addClass(current_colour_class);
              ny = ny + 1;
            }
            end_y = ny;

            // WE DRAW THE LINE
            // console.log('x-----x WE DRAW THE LINE for that column: '+coord_set.x);
            // this means: drawing the actual line, pixel by pixel
            for (var dy = start_y; dy <= end_y-1; dy++) {
              $('#container .c'+csx+'.r'+dy)
                .addClass('pixel_on')
                .addClass(current_colour_class); //.removeClass('parsed');
            }
          }
          // → we are done with the queued coordinates.

          break;
      // ZOOMS 
        case keypressed =='1':
          $('#container').css({'width':'100vw'});
          $('#sub_container_gui').css({'width':'100vw'});
          redraw_pixels_surface();
          break;
        case keypressed =='2':
         $('#container').css({'width':'50vw'});
         $('#sub_container_gui').css({'width':'50vw'});
          redraw_pixels_surface();
         break;
        case keypressed =='3':
         $('#container').css({'width':'25vw'});
         $('#sub_container_gui').css({'width':'25vw'});
          redraw_pixels_surface();
         break;

      // EXPORT/IMPORT DATA
        case keypressed == 'c':
          var pixels_data_export = [];
          $('#container .single_square.pixel_on').each(function(){
            var classes = $(this).attr('class'),
              ccx = classes.match(/c(\d+)/g),
              ccy = classes.match(/r(\d+)/g);
            var export_cx = parseInt(ccx[0].replace('c', ''));
            var export_cy = parseInt(ccy[0].replace('r', ''));
            var export_primitive = $('.c'+cx+'.r'+cy).data('export_primitive');

            single_pixel_data = {'x': export_cx, 'y': export_cy, 'svg_primitive': export_primitive, 'classes': classes}
            pixels_data_export.push(single_pixel_data);
          });
          json_export = JSON.stringify(pixels_data_export);
          var export_textarea = $('<textarea>')
            .attr({'id':'import_export'})
            .val(json_export);
          $('body').append( export_textarea );
          break;
        case keypressed == 'v':
          // elemnet exists already or not
          if ( $('#import_export').length ) {
            var json_import = JSON.parse($('#import_export').val());
            console.log(json_import);
            for (var i = json_import.length - 1; i >= 0; i--) {
              single_pixel_data = json_import[i];
              $('#container .c'+single_pixel_data.x+'.r'+single_pixel_data.y).addClass(single_pixel_data.classes);
            }
          } else {
            var import_textarea = $('<textarea>')
              .val('Now that I exist, paste your data in here, click on the side and press v key again.')
              .attr({'id':'import_export'});
            $('body').append( import_textarea );
          }
          
          break;
      // EXPORT SVG and SHAPE PALETTE
        case keypressed == 'z':
          // select svg export primitive/shape
          var data_export_primitive = $('#container .c'+cx+'.r'+cy).data('export_primitive');
          console.log(data_export_primitive);
          if (data_export_primitive !== null && data_export_primitive !== false && data_export_primitive !== undefined) {
            var current_shape_index = $.inArray(data_export_primitive, primitives);
            console.log(current_shape_index);
            next_shape_index = (current_shape_index > primitives.length-1) ? 0 : current_shape_index+1;
            console.log(next_shape_index);
            console.log(primitives[next_shape_index]);
            $('#container .c'+cx+'.r'+cy).data({'export_primitive':primitives[next_shape_index]});
            $('#sub_container_gui  .c'+cx+'.r'+cy).text(primitives_display[next_shape_index]);
          } else {
            $('#container .c'+cx+'.r'+cy).data({'export_primitive':primitives[1]});
            $('#sub_container_gui .c'+cx+'.r'+cy).text(primitives_display[1]);
          }
          break;
        case keypressed == 'x':
          var exportable_elements = $('#container .single_square').filter(function() { 
            return $(this).data('export_primitive');
          });
          // console.log(exportable_elements);

          u_w = u_h = 10;
          var content = '<svg viewBox="0 0 500 500">';  

          exportable_elements.each(function(){
            // console.log( $(this).attr('class'), $(this).data('export_primitive'))
            ele_classes = $(this).attr('class');
            ecx = ele_classes.match(/c(\d+)/g);
            ecy = ele_classes.match(/r(\d+)/g);
            ex = parseInt(ecx[0].replace('c', ''));
            ey = parseInt(ecy[0].replace('r', ''));
            console.log(ex,ey, $(this).data('export_primitive'));

            /*
              $new_rectangle = $(document.createElementNS("http://www.w3.org/2000/svg", "polygon")).attr({
                  "points": one_pixel.points,
                  "style": "fill:"+one_pixel.color+";stroke:"+one_pixel.stroke_color+";stroke-width:"+one_pixel.stroke_width+";fill-rule:nonzero;"
                });
            */

            colour_rgb = $(this).css('background-color');

            switch ( $(this).data('export_primitive') ) {
              case 'square':
                // <rect x="39.952" y="60.279" width="70.148" height="70.148" style="fill: rgb(216, 216, 216);"></rect>
                content += '<rect x="'+(ex*u_w)+'" y="'+(ey*u_h)+'" width="'+u_w+'" height="'+u_h+'" style="fill: '+colour_rgb+';"></rect>';
                break;
              case 'circle':
                // <circle style="fill: rgb(216, 216, 216);" cx="133.394" cy="66.507" r="31.989"></circle>
                content += '<circle style="fill: '+colour_rgb+';" cx="'+(ex*u_w + u_w/2)+'" cy="'+(ey*u_h + u_h/2)+'" r="'+(u_w/2)+'"></circle>';
                break;
              case 'triangle':
                // <path d="M 184.48 156.194 L 223.758 224.226 L 145.202 224.226 L 184.48 156.194 Z" style="fill: rgb(216, 216, 216);"></path>
                var Ax = (ex*u_w + u_w/2);
                var Ay = (ey*u_w);
                var Bx = (ex*u_w + u_w);
                var By = (ey*u_w + u_w);
                var Cx = (ex*u_w);
                var Cy = By;
                content += '<path style="fill: '+colour_rgb+';" d="M '+Ax+' '+Ay+' L '+Bx+' '+By+' L '+Cx+' '+Cy+' L '+Ax+' '+Ay+' Z"></path>';
                break;
              case 'qc_tr':
                // Q C T R
                // QUARTER of a CIRCLE TOP RIGHT
                // <path style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);" d="M 111.955 27.799 L 111.955 41.056 L 124.652 41.056 C 124.652 34.095 118.688 27.799 111.955 27.799 Z"></path>
                // C define the curves data; first 2 pairs are x,y for the vectors, third pair is the beginning point
                // to Generate as well TOP LEFT, BOTTOM RIGHT, BOTTOM LEFT

                Ax = ex*u_w;
                Ay = ey*u_w;
                Bx = Ax;
                By = Ay + u_w;
                Cx = Ax + u_w;
                Cy = By;
                Dx = Cx;
                Dy = Ay + u_w/2;
                Ex = Ax + u_w/2;
                Ey = Ay;
                content += '<path style="fill: '+colour_rgb+';" d="M '+Ax+' '+Ay+' L '+Bx+' '+By+' L '+Cx+' '+Cy+' C '+Dx+' '+Dy+' '+Ex+' '+Ey+' '+Ax+' '+Ay+' Z"></path>'
                break;
            }

            
          });
          content += '</svg>';
            
          console.log(content);

          var blob = new Blob([content]);
          var event = new MouseEvent('click', {
             'view': window,
             'bubbles': true,
             'cancelable': true
           });

          var a = document.createElement("a");
            a.download = 'filename_export.svg';
            a.href = URL.createObjectURL(blob);
            a.dispatchEvent(event);
          break;  
    }
    console.log(keypressed, cx, cy);
    $('#container .c'+cx+'.r'+cy).addClass('selected');


  });

  // DRAW THE GRID
  var container_width = $('#container').width();
  var ele_width = ele_height = container_width/units_x;
  console.log(ele_width);
  for (row_u = 0; row_u < units_y; row_u++) {
    for (col_u = 0; col_u < units_x; col_u++) {
      var single_square = $('<div>')
          .addClass('single_square')
          .addClass('c'+col_u)
          .addClass('r'+row_u)
          .css({'top':(row_u*ele_width), 'left':(col_u*ele_height), 'width': ele_width, 'height': ele_height});

      var single_square_clone = single_square.clone();

      $('#container').append(single_square);


      single_square_clone
        .css({'top':(row_u*ele_width), 'left':(col_u*ele_height), 'width': ele_width, 'height': ele_height});
      $('#sub_container_gui').append(single_square_clone);

      
      
      
    }
  }

 $('#container .single_square').on('click', function(e){place_cursor(e)})
  // DRAW WITH THE MOUSE
  $(document).mousedown(function(e) {
      $("#container .single_square").bind('mouseover', function(e){
          $('#container .single_square').removeClass('selected');
          var ele_classes = $(e.target).attr('class');
          ccx = ele_classes.match(/c(\d+)/g);
          ccy = ele_classes.match(/r(\d+)/g);
          cx = parseInt(ccx[0].replace('c', ''));
          cy = parseInt(ccy[0].replace('r', ''));
          $(this).toggleClass('pixel_on');
          $(this).addClass(current_colour_class);
          $('#container .c'+cx+'.r'+cy).data({'export_primitive':primitives[next_shape_index]});
          $('#sub_container_gui .c'+cx+'.r'+cy).text(primitives_display[next_shape_index]);
          $(this).addClass('selected');
      });
  })
  .mouseup(function() {
    $("#container .single_square").unbind('mouseover');
  });

  // $('.single_square').mousedown(function() {
  //   $(this).css({background:"#333333"});
  // });

});

function redraw_pixels_surface() {
  var container_width = $('#container').width();
  var ele_width = ele_height = container_width/units_x;
  // console.log(ele_width);
  for (row_u = 0; row_u < units_y; row_u++) {
    for (col_u = 0; col_u < units_x; col_u++) {
      $('#container div.single_square.c'+col_u+'.r'+row_u)
          .css({'top':(row_u*ele_width), 'left':(col_u*ele_height), 'width': ele_width, 'height': ele_height});
      $('#sub_container_gui div.single_square.c'+col_u+'.r'+row_u)
          .css({'top':(row_u*ele_width), 'left':(col_u*ele_height), 'width': ele_width, 'height': ele_height});
    }
  }
}

// CLICK = place the cursor on the clicked element
function place_cursor(e) {
  $('#container .single_square').removeClass('selected');
  var ele_classes = $(e.target).attr('class');
  ccx = ele_classes.match(/c(\d+)/g);
  ccy = ele_classes.match(/r(\d+)/g);
  cx = parseInt(ccx[0].replace('c', ''));
  cy = parseInt(ccy[0].replace('r', ''));
 
  $('.'+ccx+'.'+ccy).addClass('selected');
}