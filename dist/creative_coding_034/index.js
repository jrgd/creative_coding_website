$(document).ready(function(){

  var cx = 5, cy = 5;
  $('body').on('keyup', function(k){
    var keypressed = k.originalEvent.key;
    console.log(k);
    console.log(keypressed, cx, cy);
    $('.single_square').removeClass('selected');
    switch(true) {
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
    }
    console.log(keypressed, cx, cy);
    $('.c'+cx+'.r'+cy).addClass('selected');


  });

  var units_x = 11;
  var units_y = 11;
  for (row_u = 0; row_u < units_y; row_u++) {
    for (col_u = 0; col_u < units_x; col_u++) {
      var single_square = $('<div>')
          .addClass('single_square')
          .addClass('c'+col_u)
          .addClass('r'+row_u)
          .css({'top':(row_u*30), 'left':(col_u*30)});

      $('#container').append(single_square);
    }
  }
});