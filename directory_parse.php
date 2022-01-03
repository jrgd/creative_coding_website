<?php

require __DIR__ . '/vendor/autoload.php';

use Parsedown;
$Parsedown = new Parsedown();



echo "### --- CREATIVE CODING\n";
$file_number = 0;
// list all directories within source

$dir = './source';

if (is_dir($dir)) {
  $output_array = [];
  if ($dOP = opendir($dir)) {
    while (($file = readdir($dOP)) !== false) {
      if ($file != "."  && $file != ".DS_Store" && $file != "..") {
        if (is_dir($dir.'/'.$file)) {
          if ($dir_inside =  opendir($dir.'/'.$file)) {

            while (($file_inside = readdir($dir_inside)) !== false) {

              // copy repositories folders into dist
              $cmd = "cd ./source && cp -r ./{$file} ../dist";
              $cmd_result = shell_exec($cmd);

              // delete .git archive
              $cmd = 'find ./dist \( -path "*/.git/*" -or -name ".git" \) -delete';
              $cmd_result = shell_exec($cmd);              

              // create zip files to distribute an archive
              $cmd = "cd ./dist && zip -r ./{$file}/{$file}.zip {$file}";
              $cmd_result = shell_exec($cmd);

              // ceate content for index.html: links to page and zip, short description, etc.
              if ($file_inside == "index.html" || $file_inside ==  "index.php") {
                $file_inside = urlencode($file_inside);
                $readme_file = $dir.'/'.$file.'/readme.md';
                if (file_exists($readme_file)) {
                  $readme_content = file_get_contents($readme_file);  
                  $line = preg_split('#\r?\n#', trim($readme_content), 0)[0];
                } else {
                  $readme_content = $line = "";
                }
                $file_number++; // = intval($file);
                // {$dir}/
                $link_text = str_replace('creative_coding_', '', $file);
                $output_array[$file_number] = "<div class='image'><a href='{$file}/{$file_inside}'>$link_text</a> {$line} <a href='./{$file}/{$file}.zip'>[zip]</a> </div>";
                $content_summary_array[$file_number] = "{$file} --- {$line} ";

              }
            }
          }
        }
      }
    }
  }

  sort($output_array);
  // var_dump($output_array);
  foreach ($content_summary_array as $key => $value) {
    echo $value."\n";
  }


  
}


// use the github link in a specific text file to generate liks back to github


// GENERATE THE FILES
$default_header = file_get_contents('./default_header.html');
$default_menu = file_get_contents('./default_menu.html');
$default_footer = file_get_contents('./default_footer.html');

// get the notes md files from ./source_notes and compile them into html files
// must include:
// - a header
// - a footer
// - a menu for navigating the pages
// the ages must be included in the index.html section above

$dir = './source_notes';
if (is_dir($dir)) {
  if ($dOP = opendir($dir)) {
    while (($file = readdir($dOP)) !== false) {
      if ($file != "."  && $file != ".DS_Store" && $file != "..") {
        if (is_dir($dir.'/'.$file)) {
          if ($dir_inside =  opendir($dir.'/'.$file)) {

            while (($file_inside = readdir($dir_inside)) !== false) {
            }
          }
        }
        if (is_file($dir.'/'.$file)) { // this is a file withibn the main source_notes directory
          echo "=== {$file} \n";

          // read the file content
            $text_content = file_get_contents($dir.'/'.$file);
          // check the extension; change the file name and ocnvert the content if need be
            $file_extension_dot_pos = strrpos($file, '.');
            $file_extension = substr($file, $file_extension_dot_pos+1);
          // if md, converts it to html
          // if html, just get the content
            if ($file_extension === 'md') {
              $text_content = $Parsedown->text($text_content);
            }
          

            $file_name = substr($file, 0, $file_extension_dot_pos);

          // concatenate content: add header and footer, the simple menu and the content
            $notes_file_content .= $default_header;
            $notes_file_content .= $default_menu;
            $notes_file_content .= $text_content;
            $notes_file_content .= $default_footer;

          // save the file
            file_put_contents('./dist/'.$file_name.'.html', $notes_file_content);
            $notes_links .= "<a href='./{$file_name}.html'>{$file_name} [{$file_extension}]</a>";

        }
      }
    }
  }
}

// generate index.html main entry (home) page
$index_content = "";
$index_content .= $default_header;
$index_content .= "<h2>Notes</h2>";
$index_content .= $notes_links;
$index_content .= "<h2>Experiments</h2>";
foreach ($output_array as $key => $value) {
  $index_content .= $value."\n";
}
$index_content .= $default_footer;


// create the index files
file_put_contents('./dist/index.html', $index_content);
?>