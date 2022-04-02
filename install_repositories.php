<?php

echo "### --- CREATIVE CODING\n";
echo "###     installing repositories\n";

$repositories_array = [
  "https://github.com/jrgd/creative_coding_001",
  "https://github.com/jrgd/creative_coding_002",
  "https://github.com/jrgd/creative_coding_003",
  "https://github.com/jrgd/creative_coding_005",
  "https://github.com/jrgd/creative_coding_006",
  "https://github.com/jrgd/creative_coding_010",
  "https://github.com/jrgd/creative_coding_012",
  "https://github.com/jrgd/creative_coding_013",
  "https://github.com/jrgd/creative_coding_014",
  "https://github.com/jrgd/creative_coding_022",
  "https://github.com/jrgd/creative_coding_024",
  "https://github.com/jrgd/creative_coding_025",
  "https://github.com/jrgd/creative_coding_026",
  "https://github.com/jrgd/creative_coding_027",
  "https://github.com/jrgd/creative_coding_029",
  "https://github.com/jrgd/creative_coding_029b",
  "https://github.com/jrgd/creative_coding_030",
  "https://github.com/jrgd/creative_coding_031",
  "https://github.com/jrgd/creative_coding_032",
  "https://github.com/jrgd/creative_coding_033",
  "https://github.com/jrgd/creative_coding_034",
  "https://github.com/jrgd/creative_coding_035",
  "https://github.com/jrgd/creative_coding_036",
  "https://github.com/jrgd/creative_coding_037",
  "https://github.com/jrgd/creative_coding_038",
  "https://github.com/jrgd/creative_coding_038-NK",
  "https://github.com/jrgd/creative_coding_039",
  "https://github.com/jrgd/creative_coding_040",
  "https://github.com/jrgd/creative_coding_041",
  "https://github.com/jrgd/creative_coding_042",
  "https://github.com/jrgd/creative_coding_043_clui",
  "https://github.com/jrgd/creative_coding_050",
  "git@github.com:jrgd/creative_coding_51_kanban.git",
  "https://github.com/jrgd/creative_coding_052",
  "https://github.com/jrgd/creative_coding_053",
  "https://github.com/jrgd/creative_coding_054",
  "https://github.com/jrgd/creative_coding_055",
  "https://github.com/jrgd/creative_coding_056",
];

foreach($repositories_array as $single_repository) {
  echo $single_repository." : ";
  $cmd = "cd ./source && git clone '{$single_repository}'";
  $cmd_result = shell_exec($cmd);
  echo $cmd_result."\n";
  $cmd = "cd \"./source/$(basename \"{$single_repository}\" .git)\" && echo \"{$single_repository}\" > repository_link.txt";
  $cmd_result = shell_exec($cmd);
  echo $cmd_result."\n";
}

// add the github link in a specific text file