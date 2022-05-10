<?php
  $t1 = time();
  $t2 = $argv[1];
  $hour = floor(($t1-$t2)/3600);
  $minute =floor(($t1-$t2)/60)%60;
  $second = ($t1-$t2)-($hour*3600+$minute*60); 
  $time_elapsed = $t1 - $t2;
  $time_elapsed_hr = date("H:i:s",strtotime($hour.":".$minute.":".$second));
  $csv_line = $t1 . ',' . $time_elapsed . ',' . $time_elapsed_hr;
  file_put_contents('./rt.csv', $csv_line, FILE_APPEND);
  echo $time_elapsed."\r";