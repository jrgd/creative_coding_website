var previous_command = [];
var command_history_index = 0;

$(document).ready(function(){
  $('#clui_line').keyup(function(e){
    switch(e.key) {
      case "Enter":
        // execute the command
        var command_to_execute = $('#clui_line').val();
        console.log('Executing: '+command_to_execute);
        exec_command( command_to_execute );
        command_history_index = previous_command.push(command_to_execute) - 1;
        console.log(previous_command, command_history_index);
        $('#clui_line').val(''); // RESET THE COMMAND LINE
        break;
      case "ArrowUp":
        $('#clui_line').val(previous_command[command_history_index]);
        if (command_history_index >= 0) {
          command_history_index--;
        } else {
          command_history_index = previous_command.length;
        }
        break;
      case "ArrowDown":
        $('#clui_line').val(previous_command[command_history_index]);
        if (command_history_index < previous_command.length) {
          command_history_index++;
        } else {
          command_history_index = 0;
        }
        break;
      default:
        break;
    }
  })

  setup_interaction()
});

function setup_interaction() {
  $('li.command_history').on('click', function(){
    var old_is_new = $(this).text();
    console.log(old_is_new);
    $('#clui_line').val( old_is_new );
    $('#clui_line').focus();
  })
}
function exec_command(command) {
  output_content_display = "";
  command = command.toLowerCase();
  $('#clui_content').html( $('#clui_content').html() + "<br>" + "&gt; " + command );
  var output_content_display = "";

  // PARSE THE COMMAND: ACTION AND ARGUMENTS
  var command_array = command.split(' ');
  var action = command_array[0];

  if (action == 'open') {
    output_content_display = "# Action: "+action+"<br>";
    for(var argument_index = 1; argument_index < command_array.length; argument_index++) {
      output_content_display += "# argument "+argument_index+": "+command_array[argument_index]+"<br>";  
    }    
  }

  if (action == 'list') {
    // AJAX load from server / php script
    command_array_json = JSON.stringify(command_array);
    output_content_display += '[loading]';
    $('#ajax_temp_output').load(
      './server_commands.php',
      {'command':command_array_json},
      function(response){
        update_display(response);
      }
    );
  }

  if (action == 'history') {
    // array: previous_command
    output_content_display += "<b>Previous commands</b><ul>";
    $(previous_command).each(function(i,el){
      output_content_display += "<li class='command_history'>"+el+"</li>";
    });
    output_content_display += "</ul>";
  }

  if (action == "clear") {
    $('#clui_content').html("");
  }

  // HIDDEN CONTENT TO BE DISPLAYED
  // about
  // help
  if ( $('#hidden_information [data-command='+action+']').length > 0 ) {

    if ( $('#hidden_information [data-command='+action+'] span[data-choice]').length > 0 ) {
      var random_answer_index = Math.floor(Math.random()*$('#hidden_information [data-command='+action+'] span[data-choice]').length);
      // output_content_display += $('#hidden_information [data-command='+action+'] span[data-choice]').length +' possibilities.<br>';
      // output_content_display += 'Random answer: #'+random_answer_index+'<br>';

      var random_answer = $('#hidden_information [data-command='+action+'] span[data-choice]').eq(random_answer_index).html();
      output_content_display += random_answer;
    } else {
      output_content_display += $('#hidden_information [data-command='+action+']').html();
    }
    
  }
  
  if (output_content_display == "" && action != "clear") {
    output_content_display = "Command unknown.<br>";
  }
  
  update_display(output_content_display);
}

function update_display(output_content_display) {
  $('#clui_content').html( $('#clui_content').html() + "<br>" + output_content_display );
  var height_to_scroll = $('#clui_content').prop('scrollHeight');
  $('div#clui_content').scrollTop( height_to_scroll );
  setup_interaction();
}