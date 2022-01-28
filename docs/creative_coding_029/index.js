$('document').ready(function(){
  
  for(col=1; col<=6; col++) {
    for(row=1; row<=7; row++) {
      $('<div>')
        .addClass('square')
        .css({'top':row* 20, 'left':col*20})
        .appendTo('#container')
        .on('click', function(){
          if($(this).hasClass('filled')) {
            $(this).removeClass('filled');
          } else {
            $(this).addClass('filled');
          }
        });
    }
  }
  
  $('#export').on('click', function(){
    $('#exported_html').text(   $('#container').html());
  })
})