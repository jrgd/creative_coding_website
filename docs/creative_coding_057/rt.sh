#!/bin/sh
timestamp=$(date +%s)
while true; do
  trap "echo " INT
  php rt.php $timestamp "$@"
  trap - INT
  php rtq.php $timestamp
  sleep 0
  exit
done