#!/bin/sh
chmod -R +w ./source
rm -r ./source
mkdir ./source
php install_repositories.php