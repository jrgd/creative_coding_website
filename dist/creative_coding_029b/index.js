$('document').ready(function(){
  // var color_index = 0;
  var color_palette = ["#e9a4ea", "#ab25ac", "#881389", "#640765", "#3f023f"];

  for(col=1; col<=30; col++) {
    for(row=1; row<=30; row++) {
      $('<div>')
        .addClass('square')
        .css({'top':row* 20, 'left':col*20})
        .data({'color_index': 0})
        .appendTo('#container')
        .on('click', function(){
          var color_index = $(this).data('color_index');
          if (color_index >= color_palette.length-1) {
            color_index = 0;
            $(this).removeClass('filled');
            $(this).css({'background-color': 'transparent'});
          } else {
            if ($(this).hasClass('filled')) {
              color_index = color_index + 1; // can be written: color_index++;
            } else {
              color_index = 0;
            }
            $(this).addClass('filled');
            $(this).css({'background-color': color_palette[color_index]});
          }
          $(this).data({'color_index': color_index})
          console.log( (color_index > color_palette.length-1), color_index, color_palette.length, color_palette[color_index] );
        });
    }
  }
  
  $('#export').on('click', function(){
    $('#exported_html').text(   $('#container').html());
  })
})