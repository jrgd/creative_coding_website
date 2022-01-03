$(document).ready(function(){

  $('.c_rows_q, .c_cols_q').on('change', function(e) {
    console.log($(e.target).data('canvas_property'), e.target.value);
    setup_grid();
  });

  // setup the canvas grid
  setup_grid();
  function setup_grid() {
    
    $('#canvas').empty();

    var grid_cols_q = $('.c_cols_q').val();
    var grid_rows_q = $('.c_rows_q').val();
    var ele_height = 30;
    var ele_width = 30;

    for (var grid_cols_i = 0; grid_cols_i <= grid_cols_q - 1; grid_cols_i++) {
      for (var grid_rows_i = 0; grid_rows_i <= grid_rows_q - 1; grid_rows_i++) {
        var new_cell = $("<div>")
          .addClass('c_'+grid_cols_i)
          .addClass('r_'+grid_rows_i)
          .addClass('grid_cell')
          .addClass('black')
          .css({'top':(grid_rows_i * ele_height)+'px', 'left':grid_cols_i * ele_width})
          .on('click', function(e){
            if($(this).hasClass('black')) {
              $(this).removeClass('black').addClass('white');
            } else {
              $(this).removeClass('white').addClass('black');
            }
            
          })
        $('#canvas').append(new_cell);
      }
    }

  }
  

  // Export the canvas cells
  // … well, kind of.
  $('#export').on('click', function(){
    var html_to_export = $('#canvas').html();

    var display_code = $('<textarea>')
      .text(html_to_export);
    $('body').append(display_code);
  });
});