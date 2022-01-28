$(document).ready(function(){

  var cx = 5, cy = 5;
  


  $('#generate').on('click', function(){
    $('#container').empty();

    var data = $('#data').val();

    var data_array = data.split('\n');
    console.log(data_array);

    // what's the max length
    var longest_columns = data_array.reduce( 
    // reduce = take a pair of values from the array,
    // they will both be replaced by the returned value
    // hence progressively reducing the size of the array, one value at a time
        function (a, b) {
            // if a.length > b.length return a, else return b
            return a.length > b.length ? a : b;
        }
    ).length;


    $(data_array).each(function(index, element){
      var text_padding = '0'.repeat( longest_columns - data_array[index].length );
      data_array[index] = data_array[index] + text_padding;
      console.log(data_array)
    }) 

    // how many lines
    var lines_number = (data.match(/\n/g) || []).length + 1; // +1 to account for the last line


    var units_x = longest_columns;
    var units_y = lines_number;
    var character = 0;
    var end_of_line_data = 0;

    for (row_u = 0; row_u < units_y; row_u++) {
      end_of_line_data = 0;

      for (col_u = 0; col_u < units_x; col_u++) {

        

        var single_square = $('<div>')
            .addClass('single_square')
            .addClass('c'+col_u)
            .addClass('r'+row_u)
            .css({'top':(row_u*30), 'left':(col_u*30)});
        
          single_square.text(data_array[row_u][col_u]);
        
        

        $('#container').append(single_square);
        character++;
      }
    }

    
  });
});


