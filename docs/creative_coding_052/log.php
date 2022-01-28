#!/usr/local/bin/php 
<?php
$ENV_FILE = dirname (__FILE__)."/.env";
if(file_exists($ENV_FILE)) {
  $env_config = file_get_contents($ENV_FILE);
  // loop through the lines; use the first string before the "=" and the last bit of string after it.
  $env_lines = explode("\n", $env_config);
  foreach ($env_lines as $env_line) {
    if( $env_line != "") {
      list($env_name, $env_value) = explode('=', $env_line, 2);
      $env_name = trim($env_name);
      $$env_name = trim($env_value);
    }
  }
} else {
  $ENV_CONTENT = "USER__DIR=\n";
  file_put_contents("{$ENV_FILE}", $ENV_CONTENT);
  exit("ERROR: insert USER__DIR config info in .env file");
}

// week number and year
$timestamp = time();
$day_ = date("l");
$day_n = date("d");
$month_n = date("n");
$week_n =  date("W");
$year_n = date("Y");

$file_name = "intentional_log.txt";
$file_path = "{$USER_DIR}/{$file_name}";

array_shift($argv); // pop out the first eleemnt of the array
$arguments_string = implode(' ', $argv); // concatenation; also array_map('escapeshellarg', $argv)
$text_log = "[{$timestamp} - {$year_n}-{$month_n}-{$day_n}] {$arguments_string}\n";

if(file_exists($file_path)) {
  $existing_log_content = file_get_contents($file_path);
  $updated_log_content = $text_log.$existing_log_content; // most recent on top  
} else {
  $updated_log_content = $text_log; // most recent on top  
}

file_put_contents("{$file_path}", $updated_log_content);