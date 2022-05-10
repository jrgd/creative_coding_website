<?php
$start_stamp = $argv[1];
$csv_line = "\n" . $start_stamp . "," . $argv[2] . ",";
file_put_contents('./rt.csv', $csv_line, FILE_APPEND);
// wait until interrupt
$buffer_time = time();  
while(true) {
  $time_elapsed = time()-$start_stamp;
  echo date('H:i:s', $time_elapsed)."\r";
  sleep(1);
}