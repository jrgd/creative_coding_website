<?php

require __DIR__ . '/vendor/autoload.php';

$Parsedown = new Parsedown();


// GENERATE THE FILES
$default_header = file_get_contents('./default_header.html');
$default_menu = file_get_contents('./default_menu.html');
$default_footer = file_get_contents('./default_footer.html');

$sections_list = [
  "Visual Experiments"=> [
    "001",
    "002",
    "003",
    "005",
    "006",
    "010",
    "012",
    "013",
    "014",
    "022",
    "024",
    "025",
    "026",
    "027",
    "029",
    "029b",
    "030",
    "031",
    "032",
    "033",
    "034",
    "035",
    "036",
    "037",
    "038",
    "038",
    "039",
    "040",
    "041",
    "042",
    "043_clui",
    "053",
    "055",
    "056"
  ],
  "Information Pipeline"=> [
    "050",
    "51_kanban",
    "052",
    "054",
  ]
];

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
            $single_experiment_line = "";
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
                // $file_inside = urlencode($file_inside);
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
                $repo_link = "<a href='".file_get_contents($dir.'/'.$file.'/repository_link.txt')."'>git</a>";

                if ($file_inside == "index.html" || $file_inside ==  "index.php") {
                  $single_experiment_line = "<div class='image'><b>$link_text</b> {$line} [<a href='{$file}/present.html'>info</a> <a href='{$file}/{$file_inside}'>view</a> <a href='./{$file}/{$file}.zip'>zip</a> $repo_link]</div>"; // link to the experimetn itself: {$file_inside}
                } else {
                  $single_experiment_line = "<div class='image'><b>$link_text</b> {$line} [<a href='{$file}/present.html'>info</a> <a href='./{$file}/{$file}.zip'>zip</a> $repo_link]</div>";
                }

                // to group items into a section we can now use a switch clause, and variables
                // find out if the piece number is in the sections_list, and what is its parent section
                foreach($sections_list as $section_title => $list_of_references) {
                  if (in_array($link_text, $list_of_references)) {
                    // found
                    $output_array[$section_title][$file_number] = $single_experiment_line;
                  } else {
                    // not found
                    // the mmmain issue is if the piece is not listed in the section: it wont appear at all on the page; similar to the nbreaking condition: if the repository doesn't have a index.html or index.php within, it wont be listed
                    // so we have here two fairly common cases where the code might break
                  }
                }
                // $output_array[$file_number] = $single_experiment_line;

                echo "{$file} --- {$line} \n";
                $content_summary_array[$file_number] = "{$file} --- {$line} ";

                // create a presentation page
                // $presentation_data insert readme.md text
                $presentation_data =$default_header;
                $presentation_data .=$default_menu;
                $presentation_data .= "<p>";

                $readme_content = file_get_contents("./source/{$file}/readme.md");
                $search = [
                  '# Creative Coding / Visual Experiments',
                  '## an ongoing coding/research seminar',
                  '<http://creativecoding.xyz>',
                ];
                $replace = "";
                $readme_content = str_replace($search, $replace, $readme_content);



                $presentation_data .= $Parsedown->text($readme_content);
                $presentation_data .= "<br>";
                if ($file_inside == "index.html" || $file_inside ==  "index.php") {
                  $presentation_data .= "<a href='./{$file_inside}'>View the experiment</a><br>";
                }
                $presentation_data .= "<a href='".file_get_contents("./source/{$file}/repository_link.txt")."'>Git repository</a>";
                $presentation_data .= "</p>";
                // insert code content in the page
                if (file_exists("./source/{$file}/index.js")) {
                  $presentation_data .= "<pre><code>";
                  $presentation_data .= htmlentities(file_get_contents("./source/{$file}/index.js"));
                  $presentation_data .= "</code></pre>";  
                }
                if (file_exists("./source/{$file}/index.php")) {
                  $presentation_data .= "<pre><code>";
                  $presentation_data .= htmlentities(file_get_contents("./source/{$file}/index.php"));
                  $presentation_data .= "</code></pre>";  
                }
                $presentation_data .=$default_footer;
                file_put_contents("./docs/{$file}/present.html", $presentation_data);
                $presentation_data = "";
              } else {
                // there is no web page to display; it might be a script in bash or applescript
                // $presentation_data = "";
              }
            }
            echo "{$file}\n";
            if (strlen($single_experiment_line) < 1 ) {
              $presentation_data =$default_header;
              $presentation_data .=$default_menu;
              
              echo "### missing index file - will atempt to autocreate one from readme.md ###\n";
              // the variable has not been built
              // so the repo doesnt have a page to present the project
              // let's build one.
              $readme_file = $dir.'/'.$file.'/readme.md';

              
              if (file_exists($readme_file)) {
                echo "working with {$file} to auto generate the present.html file \n";
                $readme_content = file_get_contents("./source/{$file}/readme.md");
                $search = [
                  '# Creative Coding / Visual Experiments',
                  '## an ongoing coding/research seminar',
                  '<http://creativecoding.xyz>',
                ];
                $replace = "";
                $readme_content = str_replace($search, $replace, $readme_content);

                // echo $readme_content;
                // echo "\n";

                $presentation_data .= $Parsedown->text($readme_content);
                $line = preg_split('#\r?\n#', trim($readme_content), 0)[0];
                $presentation_data .= "<a href='".file_get_contents("./source/{$file}/repository_link.txt")."'>Git repository</a>";
                file_put_contents("./docs/{$file}/present.html", $presentation_data);


                $link_text = str_replace('creative_coding_', '', $file);
                $repo_link = "<a href='".file_get_contents($dir.'/'.$file.'/repository_link.txt')."'>git</a>";
                $single_experiment_line = "<div class='image'><b>$link_text</b> {$line} [<a href='{$file}/present.html'>info</a> <a href='./{$file}/{$file}.zip'>zip</a> $repo_link]</div>";

                echo $single_experiment_line."\n";

                foreach($sections_list as $section_title => $list_of_references) {
                  if (in_array($link_text, $list_of_references)) {
                    // found
                    $output_array[$section_title][$file_number] = $single_experiment_line;
                  }
                }
              } else {
                // $readme_content = $line = "";
              }


            }
          }
        }
      }
    }
  }

  
  // var_dump($output_array);
  foreach ($content_summary_array as $key => $value) {
    echo $value."\n";
  }
}

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
          $page_content = "";
          $page_content .= $default_header;
          $page_content .= $default_menu;
          if ($dir_inside =  opendir($dir.'/'.$file)) {

            $cmd = "mkdir ./docs/{$file}";
            $cmd_result = shell_exec($cmd);
            

            while (($file_inside = readdir($dir_inside)) !== false) {
              $file_extension_dot_pos = strrpos($file_inside, '.');
              $file_extension = substr($file_inside, $file_extension_dot_pos+1);
              switch (strtolower($file_extension)) {
                case 'md':
                case 'txt':
                case 'html':
                  // code...
                  $page_content_array['texts'][] = $Parsedown->text( file_get_contents($dir .'/'. $file.'/'.$file_inside) );
                  break;

                case 'jpg':
                case 'png':
                case 'jpeg':
                case 'gif':
                  $source_path = $dir.'/'.$file;
                  $cmd = "cp ./{$source_path}/{$file_inside} ./docs/{$file}/";
                  $cmd_result = shell_exec($cmd);
                  $page_content_array['images'][] = "<img src='./".$file."/".$file_inside."'>";
                  break;

                default:
                  // code...
                  break;
              }
            }

            // firast output the texts, then the images
            foreach($page_content_array['texts'] as $single_text_element) {
              $page_content .= $single_text_element;
            }
            foreach($page_content_array['images'] as $single_image_element) {
              $page_content .= $single_image_element;
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
            $notes_file_content = '';
          // concatenate content: add header and footer, the simple menu and the content
            $notes_file_content = "";
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
$index_content .= $default_menu;
$index_content .= "<h2>Notes</h2><div class='notes'>";
$index_content .= $notes_links;
$index_content .= "</div><h2>Experiments</h2>";
foreach ($output_array as $section_title => $section_content) {
  $index_content .= "<details><summary><h3>{$section_title}</h3></summary>";
  sort($section_content);
  foreach($section_content as $value) {
    $index_content .= $value."\n";  
  }
  $index_content .= "</details>";
}
$index_content .= $default_footer;


// create the index files
file_put_contents('./docs/index.html', $index_content);

// generate notes.html
$index_notes_content = "";
$index_notes_content .= $default_header;
$index_notes_content .= $default_menu;
$index_notes_content .= "<h2>Notes</h2>";
$index_notes_content .= $notes_links;
$index_notes_content .= $default_footer;
// create the index files
file_put_contents('./docs/notes.html', $index_notes_content);
?>
