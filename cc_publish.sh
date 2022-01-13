#!/bin/sh
yarn build
git commit -m 'publish: website automatically rebuilt'
git push