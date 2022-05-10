<?php

$dir = "../documents";
// foreach ($dirs_array as $dir) {
//   if (is_dir($dir)) {
    if ($dOP = opendir($dir)) {
      while (($file = readdir($dOP)) !== false) {
        if ($file != "."  && $file != ".DS_Store" && $file != ".." && is_file($dir.'/'.$file)) {
          $input = file_get_contents($dir.'/'.$file);

          $regex = '~(#\w+)~';
          if (preg_match_all($regex, $input, $matches, PREG_PATTERN_ORDER)) {
             foreach ($matches[1] as $word) {
                // echo $word ."\n";

                $hastags_index[$word][] = "{$dir}/{$file}";
             }
          }
        }
      }

      
      foreach($hastags_index as $single_hashtag => $single_hashtag_files_data) {
        echo "<details><summary><b>{$single_hashtag}</b></summary><ul>";
          foreach($single_hashtag_files_data as $single_filepath) {
            $single_file_name = str_replace('../documents/', '', $single_filepath);
            $single_filepath_corrected = str_replace('../documents/', './documents/', $single_filepath);
            echo "<li><a href='{$single_filepath_corrected}'>{$single_file_name}</a></li>";
          }
        echo "</details></ul>";
      }

    }
//   }
// }