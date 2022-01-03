var last_focussed;

$(document).ready(function(){
  $('input').on('keyup', function(){
    draw_gradients();
  });
  $('input').on('change', function(){
    draw_gradients();
  })
  $('input').on('click', function(){
    last_focussed = $(this);
    console.log(last_focussed);
  })
  $('#palette div').on('click', function(){
    console.log(last_focussed);
    console.log( $('[name=start_r]') );
    console.log($('[name=start_r]').is(last_focussed) );
    var palette_bg_col = $(this).css('background-color');
    var palette_col_array = getRGB(palette_bg_col);
    if ( $('[name=start_r]').is(last_focussed) || $('[name=start_g]').is(last_focussed) || $('[name=start_b]').is(last_focussed)) {
      $('[name=start_r]').val(palette_col_array.r);
      $('[name=start_g]').val(palette_col_array.g);
      $('[name=start_b]').val(palette_col_array.b);
    } else {
      $('[name=end_r]').val(palette_col_array.r);
      $('[name=end_g]').val(palette_col_array.g);
      $('[name=end_b]').val(palette_col_array.b);
    }
    draw_gradients();
  })
});

function draw_gradients(){
  var colours_data = get_colours_data();
  create_gradients(
    colours_data.r_start,
    colours_data.g_start,
    colours_data.b_start,
    colours_data.r_increment,
    colours_data.g_increment,
    colours_data.b_increment, 
    colours_data.steps
  );
}

function get_colours_data() {
  var r_start = parseInt($('input[name=start_r]').val()),
      g_start = parseInt($('input[name=start_g').val()),
      b_start  = parseInt($('input[name=start_b]').val()),

      r_end = parseInt($('input[name=end_r]').val()),
      g_end = parseInt($('input[name=end_g]').val()),
      b_end  = parseInt($('input[name=end_b]').val()),

      steps =  parseInt($('input[name=steps_q]').val())+1,

      r_increment = fl((r_end - r_start) / steps),
      g_increment = fl((g_end - g_start) / steps),
      b_increment = fl((b_end - b_start) / steps);

      $('input[name=r_increment]').val(r_increment);
      $('input[name=g_increment]').val(g_increment);
      $('input[name=b_increment]').val(b_increment);
      
      return {r_start: r_start, g_start: g_start, b_start: b_start, r_end: r_end, g_end: g_end, b_end: b_end, steps: steps, r_increment: r_increment, g_increment: g_increment, b_increment: b_increment};
}
function create_gradients(r_start, g_start, b_start, r_increment, g_increment, b_increment, steps){
  $('#output').empty();
  var r_first = r_start+((steps+1)*r_increment);
  var g_first = g_start+((steps+1)*g_increment);
  var b_first = b_start+((steps+1)*b_increment);

  
  // Generate the colours for the steps

  for (var i = 0; i <= steps; i++) {
    var r_g_i = r_start + (i * r_increment);
    var g_g_i = g_start + (i * g_increment);
    var b_g_i = b_start + (i * b_increment);
    var gradient_square = $('<div>')
      .css({'background-color': 'rgb('+r_g_i+','+g_g_i+','+b_g_i+')'})
      .text('('+r_g_i+','+g_g_i+','+b_g_i+')');
    $('#output').append(gradient_square);
  }

  // // the last element
  // var first_gradient_square = $('<div>')
  //   .css({'background-color': 'rgb('+r_first+','+g_first+','+b_first+')'})
  //   .text('('+r_first+','+g_first+','+b_first+')');
  // $('#output').append(first_gradient_square);
  
}

function fl(n) {
  return Math.floor(n);
}

function getRGB(str){
  var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
  return match ? {
    r: match[1],
    g: match[2],
    b: match[3]
  } : {};
}