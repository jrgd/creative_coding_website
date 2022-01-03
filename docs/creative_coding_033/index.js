$(document).ready(function(){
  $('body').on('keyup', function(k){
    
    var keypressed = k.originalEvent.key
    console.log(keypressed);

    switch(true) {
      case keypressed = 'w':
      // code
        break;
      case keypressed = 'a':
        break;
      case keypressed = 's':
        break;
      case keypressed = 'd':
        break;  
    }
  });
});