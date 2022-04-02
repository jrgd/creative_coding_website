#!/bin/sh
#"creativecoding.xyz" > ./docs/CNAME
yarn build
git commit -m 'publish: website automatically rebuilt'
git push