<?php

require '../vendor/autoload.php';
use League\HTMLToMarkdown\HtmlConverter;

$file_path_dest = '../'.$_GET['file_path'];
$file_content = $_GET['content'];
$converter = new HtmlConverter();
$converter->getConfig()->setOption('strip_tags', true);
$converted_file_content = $converter->convert($file_content);
file_put_contents($file_path_dest, $converted_file_content);

echo "<b>saved</b>: ".$file_path_dest;