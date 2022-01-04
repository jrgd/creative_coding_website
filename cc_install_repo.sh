#!/bin/sh
rm -r ./source
mkdir ./source
php install_repositories.php

# copy files from the SyncThing folder, made specifically to publish content
rm -r ./source_notes
mkdir ./source_notes
cp -r ~/Sync_thinking-doing-writing/publish/creative_coding_website/* ./source_notes