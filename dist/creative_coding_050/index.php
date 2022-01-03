<?php 
//
?><!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>

  
  <style type="text/css">
    body {
      margin: 0;
      padding:  0;
      /*overflow:  hidden;*/
    }

    choice.link_interface {
      background-color:  yellow;
      padding:  3px;
      color:  black;
      font-family: monospace;
      font-size:  11px;
      border:  1px solid black;
      margin:  3px 0;
      width:  200px;
      text-align: center;
    }

    button.small_edit {
      width: 50px;
      margin-left:  10px;
      padding: 0;
    }
    button {
      font-family: monospace;
      font-size:  11px;
      border:  1px solid black;
      margin:  3px 0;
      width:  200px;
      text-align: center;
    }

    card {
      display:  block;
      width:  80vw;
      height:  80vh;
      margin:  5vh 5vw 5vh 5vw;
      padding:  5vh 5vw 5vh 5vw;
      border:  1px solid black;
    }

    card text {
      font-family: serif;
      font-size: 40px;
    }
    card choice {
      display:  block;
      color:  blue;
    }
    card choice:hover {
      display:  block;
      color:  blue;
      text-decoration:  underline;
      cursor: pointer;
    }

    text {
      display:  block;
    }

    controls {
      position:  fixed;
      top:  0;
      right:  0;
      margin:  5px;
      padding:  5px;
      border:  1px solid black;
      width:  250px;
      text-align:  right;
      background-color:  yellow;
    }

    textarea.content_export {
      width:  90vw;
      height:  90vh;
      margin:  5vh 5vw 5vh 5vw;
    }
  </style>
</head>
<body>

  <controls>
    <!-- <button action='minimise'>-</button><br> -->
    <button action='save'>Save</button><br>
    <!-- <button action='new'>New</button><br> -->
  </controls>


    <card location_name="1" source="[]">
      <text timeout="">
        C'est un bon début: plusieurs directions s'ouvrent à toi! L'univers t'encourage donc à explorer; tu penses que
      </text>
      <choice destination="2">Oui, c'est une bonne chose.<button class="small_edit link_interface">Edit</button></choice>
      <choice destination="3">Non, c'est terrifiant.<button class="small_edit link_interface">Edit</button></choice>
    <button role="edit_content">Edit content</button></card>

    <card location_name="2" source="[ID.choice, ID.choice, ID.choice]">
      <text timeout="">
        Clairement, la situation est la suivante.
        Tu peux aller:
      </text>
      <choice destination="1">à droite<button class="small_edit link_interface">Edit</button></choice>
      <choice destination="1">en haut<button class="small_edit link_interface">Edit</button></choice>
      <choice destination="1">en bas<button class="small_edit link_interface">Edit</button></choice>
      <choice destination="1">à gauche<button class="small_edit link_interface">Edit</button></choice>
      <choice destination="3">nulle part<button class="small_edit link_interface">Edit</button></choice>
    <button role="edit_content">Edit content</button></card>

    <card location_name="3" source="[ID.choice, ID.choice, ID.choice]">
      <text timeout="">
  Comme c'est dommage.
      </text>
      
      <choice destination="2">À bien y reflechir… <button class="small_edit link_interface">Edit</button></choice>
    <button role="edit_content">Edit content</button></card>



</body>
</html>
<!-- <script type="text/javascript" src="./node_modules/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src='./app.js'></script> -->

<script type="text/javascript">
  <?php
    include('./node_modules/jquery/dist/jquery.min.js');
  ?>
</script>
<script type="text/javascript">
  <?php
    include('./app.js');
  ?>
</script>