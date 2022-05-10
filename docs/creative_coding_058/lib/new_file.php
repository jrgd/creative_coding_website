<?php
$new_file_path = $_GET['file_path'];
$pos = strrpos($new_file_path, '/') + 1;
$new_file_path_encoded = substr($new_file_path, 0, $pos) . urlencode(substr($new_file_path, $pos));
$new_file_path_encoded = str_replace('./documents', '../documents', $new_file_path_encoded);

$date = time();
$id_string = $new_file_path."--".$date;
$file_header_id = base64_encode($id_string);
$file_header_date = $date;

$file_header =  ":+id ".$file_header_id ."\n".
                ":+date-creation ". $file_header_date ."\n".
                ":+file-name ".substr($new_file_path, $pos)."\n";
                
if (file_exists($new_file_path_encoded)) {
  echo "*aborted* file exist.";
} else {
  file_put_contents($new_file_path_encoded, $file_header);
  echo "file created ".$new_file_path_encoded;
}