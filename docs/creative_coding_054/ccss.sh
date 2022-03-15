#!/bin/sh
for iii in {1..55}; do
  echo $iii
  tiii="$iii"
  if [ $iii -lt 100 ]
  then
    tiii="0$iii"
  fi
  if [ $iii -lt 10 ]
  then
    tiii="00$iii"
  fi
  url="https://creativecoding.xyz/creative_coding_$tiii/index.html"
  echo $url
  screencapture -T 3 -x -l$(osascript -e "tell application \"Safari\" to set window_id to (item 2 of (make new document with properties {URL:\"$url\"} at beginning, get id of front window))") ~/dev/creativecoding/054_automaticscreenshots/screenshots/creative_coding_automated_screenshot-$tiii.png
done

# screencapture -T 5 -x -l$(osascript -e 'tell application "Safari" to set window_id to (item 2 of (make new document with properties {URL:"https://creativecoding.xyz/creative_coding_001/index.html"} at beginning, get id of front window))') ~/Desktop/screenshot-cli-001.png
