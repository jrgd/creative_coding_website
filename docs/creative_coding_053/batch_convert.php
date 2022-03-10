<?php

$html = "<html><head><link href='./style.css' type='text/css' rel='stylesheet'></head><body><div class='figs_container'>";
$dithering_parameters = [
  "threshold",
  "threshold,2",
  "threshold,4",
  "threshold,6",
  "threshold,8",
  "threshold,16",
  "checks",
  "checks,2",
  "checks,4",
  "checks,6",
  "checks,8",
  "checks,16",
  "o2x2",
  "o2x2,2",
  "o2x2,6",
  "o2x2,16",
  "o2x2",
  "o2x2,2",
  "o2x2,6",
  "o2x2,16",
  "o8x8",
  "o8x8,2",
  "o8x8,6",
  "o8x8,16",
  "h2x2a",
  "h4x4a",
  "h6x6a",
  "h8x8a",
  "h2x2o",
  "h4x4o",
  "h6x6o",
  "h8x8o",
  "h16x16o",
];


foreach ($dithering_parameters as $k => $param) {
  $imagemagick_command_str = "convert header.jpeg -colorspace gray -ordered-dither ".$param."  -resize 800x600 header-".$param.".gif";
  $cmd = shell_exec($imagemagick_command_str);
  $file_size = ceil(filesize("./header-".$param.".gif")/1024);
  $html .= "<div class='single_fig_container'><figure><div class='img_container'><img src='header-".$param.".gif'></div><figcaption><b>{$param}</b> {$file_size}kb <br><pre>{$imagemagick_command_str}</pre></figcaption></figure></div>";
}
$html .= "</div></body></html>";
file_put_contents('index.html', $html);
