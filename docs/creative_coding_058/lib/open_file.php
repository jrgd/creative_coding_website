<?php

  require '../vendor/autoload.php';

  $file_content = file_get_contents( '../'.$_GET['file_path'] );
  $file_content_converted = nl2br($file_content);
  $Parsedown = new Parsedown();
  echo $Parsedown->text($file_content_converted);
