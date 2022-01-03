$(document).ready(function(){

  setup_choice_link();
  setup_add_choice();

  insert_edit_choices();
  insert_edit_content();

  $('controls button[action=save]').on('click', function(){
    console.log('SAVING = EXPORTING');
    // TAKES ALL CARDS AND EXPORT THEM

    $('.temp-add').remove();
    var export_content = $('<div>').append($('html').clone()).html();
    var bb = new Blob([export_content ], { type: 'text/plain' });
    var a = document.createElement('a');
    a.download = 'une-histoire-parmi-tant-d-autres.html';
    a.href = window.URL.createObjectURL(bb);
    a.click();
  })
});

function setup_add_choice(){
  $('card').each(function(){
    
    var create_new_choice = $('<choice>')
      .text('Add a destination')
      .addClass('temp-add link_interface')
      .on('click', function(){
        add_a_destination($(this));
      });

    $(this).append(create_new_choice);

    var create_new_choice = $('<choice>')
      .text('Add a source')
      .attr({'target':$(this).attr('location_name')})
      .addClass('temp-add link_interface')
      .on('click', function(){
        add_a_source($(this));
      });
    $(this).append(create_new_choice);
  });
}

function setup_choice_link() {
  $('choice').on('click', function(e){
    var destination_num = $(this).attr('destination');
    var destination_ele = $('card[location_name='+destination_num+']');
    destination_px = destination_ele.position().top;
    $(window).scrollTop(destination_px);
  });
}

function insert_edit_choices() {
  
  $('choice:not(.link_interface)').each(function(){

    $(this).find('button').remove();

    choice_edit = $('<button>')
      .text('Edit')
      .addClass('small_edit link_interface')
      .on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        var choice_current_destination= $(this).parent('choice').attr('destination');
        // edit text of the link
        var link_text = $(this).parent('choice').contents().filter(function() {
          return this.nodeType == Node.TEXT_NODE;
        }).text();

        ele_link_text_edit = $('<input>')
          .addClass('text_link')
          .val(link_text)
          .on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            
          });

        ele_link_text_edit_save = $('<button>')
          .addClass('link_interface small_edit')
          .text('Save')
          .on('click', function(e){
            e.preventDefault();
            e.stopPropagation();


            // get the value of the TEXT LINK
            var new_text_link = $(this).siblings('input.text_link').val();
            // get the value of the SELECTED CARD
            var new_selected_card_name = $(this).siblings('select').val();

            $(this).parents('choice')
              .text(new_text_link)
              .attr({'destination':new_selected_card_name});

            insert_edit_choices();
          });

        ele_link_text_edit.insertAfter( $(this) );
        ele_link_text_edit_save.insertAfter( $(this) );

        // edit the linked card
        ele_select_label = $('<label>')
          .text('Link to:');

        ele_select = $('<select>');
        ele_option = $('<option>')
          .attr({'disabled':1})
          .attr({'selected':1})
          .attr({'label':'Please select a card to link to'});
        ele_select.append(ele_option);
        $('card').each(function(){
          var card_text = $(this).find('text').text();
          var card_link = $(this).attr('location_name');
          var whole_card_text = card_text.replace( /((\s*\S+){8})([\s\S]*)/, '$1');
          ele_option = $('<option>')
            .val(card_link)
            .text(whole_card_text);

          if ( card_link == choice_current_destination) {
            ele_option.attr({'selected':1});
          }

          ele_select.append(ele_option);
        });

        ele_select.insertAfter($(this));
        ele_select_label.insertAfter($(this));
      })
    choice_edit.appendTo($(this));  
  })
  
}

function insert_edit_content(){
  $('card').each(function(){
    $(this).find('button[role=edit_content]').remove();
    var edit_content_button = $('<button>')
      .text('Edit content')
      .attr({'role':'edit_content'})
      .on('click', function(){

        var inserting_at = $(this).parents('card').children('text');
        var content_editor = inserting_at.text()

        var content_editor = $('<textarea>')
          .val(content_editor);

        var content_editor_save_button = $('<button>')
          .text('Save')
          .on('click',function(){
            new_text_content = $(this).siblings('textarea').val();
            $(this).parents('card').children('text').text(new_text_content);

            insert_edit_content();
          })
          
        inserting_at.append(content_editor_save_button);
        inserting_at.append(content_editor);
      })
    $(this).append(edit_content_button);
  })
}

function add_a_destination(el) {
  var destination_index_max = Math.max.apply(null, $('card').map(function() { return parseInt($(this).attr("location_name"));}).get())+1;

  var new_choice_container = $('<div>');
  var new_choice_form = $('<input>')
    .attr({'autofocus': 1})
    .attr({'id': 'title'})
    .on('keyup', function(e){
      if (e.originalEvent.key == 'Enter') {
        $(this).next('button').trigger('click');
      }
    });

  var new_choice_form_submit = $('<button>')
    .text('Save')
    .attr({'target': destination_index_max})
    .on('click', function(){

      // text of the link
      var text_link = $(this).prev('input').val();
      // insert a new choice with the title
      var new_choice_saved = $('<choice>')
        .attr({'destination': $(this).attr('target') })
        .text(text_link);
      $(new_choice_saved).insertBefore( $(this).parent() );
      
      // insert a new card
      var new_card = $('<card>')
        .attr({'location_name': $(this).attr('target') });

      var editor_for_new_card = $('<textarea>')
        .attr({'autofocus': 1})
        .val(text_link);

      var save_button_for_card = $('<button>')
        .text('Save')
        .on('click', function(){
          // create the card content
          var new_card = $(this).parent('card');
          var text_content_submitted = $(this).parent('card').children('textarea').val();
          console.log( text_content_submitted );

          var text_element_for_new_card = $('<text>')
            .text(text_content_submitted);

          text_element_for_new_card.appendTo(new_card);

          // add the links to craete new choices to all element on the page
          // Setup the link again
          setup_add_choice();

          $(this).prev('textarea').remove();
          $(this).remove();

          // setup the choice links again
          setup_choice_link();
        });
      
      // title_for_new_card.appendTo(new_card);
      editor_for_new_card.appendTo(new_card);
      save_button_for_card.appendTo(new_card);

      new_card.insertAfter( $('card').last() );

      // scroll to it
      new_card_destination_px = new_card.position().top;
      console.log(new_card_destination_px);
      $(window).scrollTop(new_card_destination_px);

      // CLEANING OUT
      // remove the form
      $(this).parent().remove();

          
    });

  new_choice_form.appendTo(new_choice_container);
  new_choice_form_submit.appendTo(new_choice_container);

  el.parent('card').append( new_choice_container );
  $('.temp-add').remove();
}

function add_a_source(el) {
  // same as add a destination but the link must be inserted in the source card not the current one
  console.log(el);

  var destination_index_max = Math.max.apply(null, $('card').map(function() { return parseInt($(this).attr("location_name"));}).get())+1;

  var new_choice_container = $('<div>');
  var new_choice_form = $('<input>')
    .attr({'autofocus': 1})
    .attr({'id': 'title'})
    .on('keyup', function(e){
      if (e.originalEvent.key == 'Enter') {
        $(this).next('button').trigger('click');
      }
    });

  var new_choice_form_submit = $('<button>')
    .text('Save')
    .attr({'target': destination_index_max})
    .on('click', function(){
  console.log( el.attr('target') );
      // text of the link
      var text_link = $(this).parents('card').children('text').text();
      // insert a new choice with the title
      var new_choice_saved = $('<choice>')
        .attr({'destination': el.attr('target') })
        .text(text_link);
      
      // insert a new card
      var new_card = $('<card>')
        .attr({'location_name': $(this).attr('target') });

      var editor_for_new_card = $('<textarea>')
        .attr({'autofocus': 1})
        .val('');

      var save_button_for_card = $('<button>')
        .text('Save')
        .on('click', function(){
          // create the card content
          var new_card = $(this).parent('card');
          var text_content_submitted = $(this).parent('card').children('textarea').val();
          console.log( text_content_submitted );

          var text_element_for_new_card = $('<text>')
            .text(text_content_submitted);

          text_element_for_new_card.prependTo(new_card);

          // add the links to craete new choices to all element on the page
          // Setup the link again
          setup_add_choice();

          $(this).prev('textarea').remove();
          $(this).remove();

          // setup the choice links again
          setup_choice_link();
          console.log('LINKS RE-ASSIGNED');
        });
      
      // title_for_new_card.appendTo(new_card);

      editor_for_new_card.appendTo(new_card);
      save_button_for_card.appendTo(new_card);
      new_choice_saved.appendTo(new_card);
      
      new_card.insertBefore( $('card').first() );

      // scroll to it
      new_card_destination_px = new_card.position().top;
      console.log(new_card_destination_px);
      $(window).scrollTop(new_card_destination_px);

      // CLEANING OUT
      // remove the form
      $(this).parent().remove();

          
    });

  new_choice_form.appendTo(new_choice_container);
  new_choice_form_submit.appendTo(new_choice_container);

  el.parent('card').append( new_choice_container );
  $('.temp-add').remove();

}
