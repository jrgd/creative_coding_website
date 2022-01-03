<?php
$command = json_decode($_POST['command']);
if ($command[0] == 'list') {
  if ($command[1] == 'files') {
    $fileList = glob('./*');
    //Loop through the array that glob returned.
    $result_quantity = count($fileList);
    // pluralisation: assuming the ending letter is always a S for plural in english
    if ($result_quantity > 1) {
      $result_object = $command[1];
    } else {
      $result_object = substr($command[1], 0, -1);
    }
    echo $result_quantity." ".$result_object.".<br>";

    echo "<ul>";
    foreach($fileList as $filename){
       echo '<li>', $filename, '</li>'; 
    }
    echo "<ul>";
  }

  elseif ($command[1] == 'images') {
    $fileList = glob('./*.{jpg,png,gif}', GLOB_BRACE);
    //Loop through the array that glob returned.
    $result_quantity = count($fileList);
    // pluralisation: assuming the ending letter is always a S for plural in english
    if ($result_quantity > 1) {
      $result_object = $command[1];
    } else {
      $result_object = substr($command[1], 0, -1);
    }
    echo $result_quantity." ".$result_object.".<br>";

    echo "<ul>";
    foreach($fileList as $filename){
       echo '<li>', $filename, '</li>'; 
    }
    echo "<ul>";
  } 

  else {
    echo "Unrecognised arguments: <b>".$command[1]."</b>.";
  }
}
