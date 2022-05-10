<?php

  $linked_document_id = trim($_GET['document_id']);

  if ( $linked_document_id == "" || $linked_document_id == " ") {
    // echo "no link.";
    die();
  }
  // echo "→ The string: ".$linked_document_id."\n";

  $dir    = '../documents';

  // first instance
  parse_directory($dir, $linked_document_id);

  function parse_directory($dir, $linked_document_id) {
    $items = scandir($dir);
    foreach ($items as $key => $single_item) {
      if ($single_item !== "." && $single_item !== ".." ) {

        
        if (is_dir($dir.'/'.$single_item)) {
        //   // yup
          // echo "<details><summary>{$single_item}</summary>";
          parse_directory($dir.'/'.$single_item, $linked_document_id);
          // echo "</details>";
        } 
        if (is_file($dir.'/'.$single_item)) {
          // echo "<a href='{$dir}/$single_item'>$single_item</a><br>";


          // CHECK IF THE DOCUMENT ID IS MATCHING THE LINK ID
          // find the document :+id operator, then proceed to identify the id itself
          $file_content = file_get_contents($dir.'/'.$single_item);
          $operator = ':+id ';
          $operator_length = strlen($operator);
          $operator_pos = strpos($file_content, $operator);
          if ($operator_pos !== false ) {
            // on the same line, so the $file_content can be truncated to the string from $operator_pos until the next \n
            $next_space_pos = strpos($file_content, " ",$operator_pos + $operator_length);
            $truncated_file_content = trim(substr($file_content, $operator_pos + $operator_length,  $next_space_pos-($operator_pos + $operator_length)) );
            if ($truncated_file_content == $linked_document_id) {
              $filepath = $dir.'/'.$single_item;
              $filepath = str_replace('../documents', './documents', $filepath);
              // echo "🔗 <a href='{$filepath}'>{$single_item}</a><br>";
              echo $filepath;
            }
          }
          // CHECK IF THE DOCUMENT CONTAINS AN :+anchor AND THAT IT IS MATCHING THE LINK ID
          $operator = ':+anchor ';
          $operator_length = strlen($operator);
          $operator_pos = strpos($file_content, $operator);
          if ($operator_pos !== false ) {
            // on the same line, so the $file_content can be truncated to the string from $operator_pos until the next \n
            $next_space_pos = strpos($file_content, " ",$operator_pos + $operator_length);
            $truncated_file_content = trim(substr($file_content, $operator_pos + $operator_length,  $next_space_pos-($operator_pos + $operator_length)) );
            if ($truncated_file_content == $linked_document_id) {
              $filepath = $dir.'/'.$single_item;
              $filepath = str_replace('../documents', './documents', $filepath);
              // echo "⚓︎ <a href='{$filepath}'>{$single_item}</a><br>";
              echo $filepath;
            }
          }
          
        }

      } else {
        // nothing.
        // echo 'not a file<br>';
      }
    }
  }