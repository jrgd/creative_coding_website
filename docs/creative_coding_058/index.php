<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>

  <style type="text/css">

    * {
      margin: 0;
      padding: 0;
      background-color: rgb(43,43,43);
      font-family: sans-serif;
      font-size: 14px;
    }
    
    #container {
      width: 100vw;
      height: 100vh;
      display:  flex;
      flex-wrap: no-wrap;
      flex-direction: row;
    }

    #container #col_1 {
      width:  75%;
      display:  flex;
      flex-wrap: no-wrap;
      flex-direction: row;
    }

    #container #col_1 #file_list_container {
      padding:  10px;
      width: calc(20% - 20px);
      height: auto;
    }

    .file_list a {
      color:  #555;
    }


    #container #col_1 #text_editor #menu_container {
      display:  flex;
      flex-direction:  row;
      flex-wrap: no-wrap;
      justify-content: flex-end;
      /*height:  18px;*/
      position:  absolute;
      right:  0;
    }

    #container #col_1 #text_editor #menu_container ul,
    #container #col_1 #text_editor #menu_container ul li {
      list-style:  none;
    }

    #container #col_1 #text_editor{
      width: 80%;
      height: 100%;
      position:  relative;
    }
    #container #col_1 #text_editor #textarea{
      width: calc(100%  - 2px - 20px);
      height:  calc( 100% - 20px);
      border:  1px solid #111;
      overflow-y:  scroll;
      padding: 10px;
      outline: none;

      color:  #BBB;
      font-family: sans-serif;
      font-size:  1.4rem;
      letter-spacing: 0.05rem;
      line-height:  2rem;
    }

    #container #col_1 #text_editor #textarea * {
      color:  #BBB;
      font-family: sans-serif;
      font-size:  1.4rem;
      letter-spacing: 0.05rem;
      line-height:  2rem;
    }

    #container #col_2 {
      width:  calc(25% - 20px);
      padding: 10px;
      /*border:  1px solid green;*/
    }

    .interface_action {
      background-color:  black;
      color:  #555;
      padding:  2px;
      font-size:  0.7rem;
      font-family:  sans-serif;
    }

    #textarea:empty::before {
        content: attr(placeholder);
        color: #555; 
        font-size:  1rem;
    }

    #textarea:empty:focus::before {
        content: "";
    }

    #textarea ul,
    #textarea ul li {
      list-style-type: '— ';
      list-style-position: inside;
    }

    hr {
      border: 0;
      border-bottom:  1px solid #111;
    }
  </style>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

  <script src='./lib/interface_commands.js'type="text/javascript"></script>
</head>
<body>


    <div id='container'>
      <div id='col_1'>
        <div id='file_list_container'>
          <div class='file_list'>
            <?php
              include('./lib/list_files.php');
            ?>
          </div>
          <div class='new_file_container'>
            <input value='new' id='new_file_name'><a href='#new' role="create_file" class='interface_action'>+ New file</a>
          </div>

        </div>
        <div id='text_editor'>
          <div id='menu_container'>
            <ul><li><a href='#save' role='save_file' class='interface_action'>Save</a></li></ul>
          </div>
          <div id='textarea' contenteditable data-file_path="new" placeholder='#!'></div>
        </div>
      </div>
      <div id='col_2'>
        <div id='latest_message_container'>
          <div id='latest_message'>message</div>
        </div>
        <hr>
        <div id='meta_content_container'>
          <b>Meta</b>
          <div id='meta_content'></div>
        </div>
        <hr>
        <div id='search_container'>
          search: <input type='text' value='' id='search_term'>
          <div id='search_results_container'></div>
        </div>
        <hr>
        <div id='tags_container'>
          <div id='tags_content' class='file_list'></div>
        </div>
        <hr>
        <div id='links_container'>
          <div id='links_content' class='file_list'></div>
        </div>
        <hr>
      </div>
    </div>

</body>
</html>