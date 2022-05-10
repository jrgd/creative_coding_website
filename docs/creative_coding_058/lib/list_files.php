<?php

// outptus list of files inside ./documents

$dir    = './documents';

// first instance
parse_directory($dir);

function parse_directory($dir) {
  $items = scandir($dir);
  foreach ($items as $key => $single_item) {
    if ($single_item !== "." && $single_item !== ".." ) {

      
      if (is_dir($dir.'/'.$single_item)) {
      //   // yup
        echo "<details><summary>{$single_item}</summary>";
        parse_directory($dir.'/'.$single_item);
        echo "</details>";
      } 
      if (is_file($dir.'/'.$single_item)) {
        echo "<a href='{$dir}/$single_item'>$single_item</a><br>";
      }

    } else {
      // nothing.
      // echo 'not a file<br>';
    }
  }
}