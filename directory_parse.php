<?php

require __DIR__ . '/vendor/autoload.php';

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

              // copy repositories folders into dist: ./docs
              $cmd = "cd ./source && cp -r ./{$file} ../docs";
              $cmd_result = shell_exec($cmd);

              // delete .git archive
              $cmd = 'find ./docs \( -path "*/.git/*" -or -name ".git" \) -delete';
              $cmd_result = shell_exec($cmd);              

              // create zip files to distribute an archive
              $cmd = "cd ./docs && zip -r ./{$file}/{$file}.zip {$file}";
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
      $page_content = '';
      if ($file != "."  && $file != ".DS_Store" && $file != "..") {
        if (is_dir($dir.'/'.$file)) {
          if ($dir_inside =  opendir($dir.'/'.$file)) {

            $cmd = "mkdir ./docs/{$file}";
            $cmd_result = shell_exec($cmd);
            $page_content .= $default_header;
            $page_content .= $default_menu;

            while (($file_inside = readdir($dir_inside)) !== false) {
              $file_extension_dot_pos = strrpos($file_inside, '.');
              $file_extension = substr($file_inside, $file_extension_dot_pos+1);
              switch ($file_extension) {
                case 'md':
                case 'txt':
                case 'html':
                  // code...
                  $page_content .= file_get_contents($dir_inside.'/'.$file_inside);
                  break;

                case 'jpg':
                case 'png':
                case 'jpeg':
                case 'gif':
                  $source_path = $dir.'/'.$file;
                  $cmd = "cp ./{$source_path}/{$file_inside} ./docs/{$file}/";
                  $cmd_result = shell_exec($cmd);
                  $page_content .= "<img src='./".$file."/".$file_inside."'>";
                  break;

                default:
                  // code...
                  break;
              }
            }
            $page_content .= $default_footer;
            file_put_contents('./docs/'.$file.'.html', $page_content);
            $notes_links .= "<a href='./{$file}.html'>{$file} [PAGE]</a><br>";
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
            file_put_contents('./docs/'.$file_name.'.html', $notes_file_content);
            $notes_links .= "<a href='./{$file_name}.html'>{$file_name} [{$file_extension}]</a><br>";

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
file_put_contents('./docs/index.html', $index_content);
?>